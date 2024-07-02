import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  products: any[] = [
    {
      name: "Tên sản phẩm",
      imageUrl: "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quantity: 2,
      price: "100,000",
      total: "200,000",
    },
    {
      name: "Tên sản phẩm",
      imageUrl: "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quantity: 2,
      price: "100,000",
      total: "200,000",
    },
    {
      name: "Tên sản phẩm",
      imageUrl: "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quantity: 2,
      price: "100,000",
      total: "200,000",
    },
    {
      name: "Tên sản phẩm",
      imageUrl: "https://images.pexels.com/photos/4050426/pexels-photo-4050426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quantity: 2,
      price: "100,000",
      total: "200,000",
    },
  ]
}
