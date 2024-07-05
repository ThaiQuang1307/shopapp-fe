import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // dùng map để lưu trữ giỏ hàng, key là id sản phẩm, value là số lượng
  private cart: Map<number|string, number> = new Map();

  constructor(
    private http: HttpClient,
    private productService: ProductService,
  ) { 
    // lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
    const storeCart = localStorage.getItem('cart');
    if (storeCart) {
      this.cart = new Map(JSON.parse(storeCart));
    }
  } 

  getCart(): Map<number|string, number> {
    return this.cart;
  }

  addToCart(productId: string | number, quantity: number): void{
    if (this.cart.has(productId)){
      // nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên quantity
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    }else {
      // nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng quantity
      this.cart.set(productId, quantity);
    }

    // sau khi thay đổi giỏ hàng, lưu trữ nó vào localStorage
    this.saveCartToLocalStorage()
  }

  private saveCartToLocalStorage():void{
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
  }

  // xóa dữ liệu trong giỏ hàng
  clearCart(): void {
    this.cart.clear();
    this.saveCartToLocalStorage()
  }
}
