import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];

  error: any;
  keyword: string = '';
  totalPages: number = 0;
  pageSize: number = 4;
  currentPage: number = 1;


  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize)
    .subscribe({
      next: (res) => {
        this.products = res.body as Array<Product>;
        let totalProducts:number = +(res.headers.get('X-Total-Count') || 0);
        this.totalPages = Math.ceil(totalProducts / this.pageSize);
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  handleCheckedChange(product: Product) {
    this.productService.checkProduct(product).subscribe({
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
        // if the last page has only one product, and we delete it, we should go back to the previous page
        if (!this.products.length) {
          this.currentPage--;
        }
        // if the first page has only one product, and we delete it, we should stay on the first page
        this.searchProducts();
      },
      error: (error) => {
        this.error = error;
        // If there's an error, revert the products list to its original state
        this.products = [...this.products, product];
      },
    });
  }

  handleGoToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.searchProducts();
    }

    handleEditProduct(product: Product) {
      this.router.navigate(['/editProduct', _t28.id]);
}
}
