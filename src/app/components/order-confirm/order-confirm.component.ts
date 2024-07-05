import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/constants/api.constant';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  couponCode: string = ''

  constructor(
    private cartService: CartService,
    private productService: ProductService,
  ) {

  }
  ngOnInit(): void {
    // lấy danh sách sản phẩm từ giỏ hàng
    const cart = this.cartService.getCart();
    // chuyển danh sách id từ Map giỏ hàng
    const productIds = Array.from(cart.keys());
    const params = {
      ids: productIds.join(',')
    }

    this.productService.getProductsByIds(params).subscribe({
      next: (response: any) => {
        if (response?.body?.length) {
          this.cartItems = productIds.map((item: any) => {
            const product = response.body.find((p: any) => p.id === item);
            if (product) {
              product.thumbnail = `${API_URL.PRODUCT.GET_IMAGE}/${product.thumbnail}`;
            }
            product.quantity = cart.get(item);
            return product;
          })
        }
      },
      error: (error: any) => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      },
      complete: () => {

      }
    })
  }

  // hàm tính tổng tiền
  calculateTotal():void {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 0
    )
  }

  // hàm xử lý việc áp dụng mã giảm giá
  applyCoupon(): void {
    // cập nhật giá trị totalAmount dựa trên mã giảm giá nếu áp dụng
  }

}
