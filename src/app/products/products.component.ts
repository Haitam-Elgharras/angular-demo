import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    { name: 'Product 1', price: 100, checked: false },
    { name: 'Product 2', price: 200, checked: true },
    { name: 'Product 3', price: 300, checked: false }
  ];
}
