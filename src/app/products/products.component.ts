import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleCheckedChange(product: Product) {
    this.productService.checkProduct(product).subscribe({
      // next: (updatedProduct) => {
      //   console.log(updatedProduct);
      // },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
