import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from 'src/app/constants/api.constant';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  productDetail?: any;
  productId: string = '';
  currentImageIndex: number = 0;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
  ) {

  }
  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = `${idParam}`
    }
    if (this.productId) {
      this.getDetailProduct()
    }
  }

  getDetailProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (response: any) => {
        if (response?.body) {
          if (response.body.product_images?.length) {
            response.body.product_images.forEach((item: any) => {
              item.image_url = `${API_URL.PRODUCT.GET_IMAGE}/${item.image_url}`
            })

            this.productDetail = response.body
            this.showImage(0)
          }
        }
      },
      error: (error: any) => {
        console.error('Error fetching detail: ', error)
      },
      complete: () => {

      }
    })
  }

  showImage(index: number): void {
    if (this.productDetail?.product_images?.length > 0) {
      if (index < 0) {
        index = 0
      } else if (index >= this.productDetail.product_images.length) {
        index = this.productDetail.product_images.length - 1
      }

      this.currentImageIndex = index
    }
  }

  thumbnailClick(index: number): void {
    this.currentImageIndex = index
  }

  nextImage(): void {
    this.showImage(this.currentImageIndex + 1)
  }

  previousImage(): void {
    this.showImage(this.currentImageIndex - 1)
  }

  addToCart(): void {
    if (this.productDetail) {
      this.cartService.addToCart(this.productDetail?.id, this.quantity)
    } else {
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.')
    }
  }

  increaseQuantity(): void {
    this.quantity++
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--
    }
  }

  buyNow():void {
    
  }

}
