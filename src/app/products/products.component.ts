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
  error: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  handleCheckedChange(product: Product) {
    this.productService.checkProduct(product).subscribe({
      // next: (updatedProduct) => {
      //   console.log(updatedProduct);
      // },
      error: (error) => {
        this.error = error;
      },
    });
  }

  handleDeleteProduct(product: Product) {
    // optimistic update
    const updatedProducts = this.products.filter((p) => p.id !== product.id);
    this.products = updatedProducts;
  
    this.productService.deleteProduct(product).subscribe({
      next: () => {
        console.log('Product deleted successfully');
      },
      error: (error) => {
        this.error = error;
        // If there's an error, revert the products list to its original state
        this.products = [...this.products, product];
      },
    });
  }
}
