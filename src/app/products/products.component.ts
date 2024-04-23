import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, public appStateService: AppStateService) {}

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    // this.appStateService.setProductState({
    // status: 'LOADING',
    //});
    this.productService.searchProducts(
      this.appStateService.productState.keyword,
      this.appStateService.productState.currentPage,
      this.appStateService.productState.pageSize
    )
    .subscribe({
      next: (res) => {
        let products = res.body as Array<Product>;
        let totalProducts:number = +(res.headers.get('X-Total-Count') || 0);
        let totalPages = Math.ceil(totalProducts / this.appStateService.productState.pageSize);

        this.appStateService.setProductState({
          products,
          totalProducts,
          totalPages,
          status: 'LOADED',
          });
      },
      error: (error) => {
        this.appStateService.setProductState({
          status: 'ERROR',
          error: error,
        });
      },
    });
  }

  handleCheckedChange(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: () => {
        // just for rendering purpose beacuse the checked property is already updated in the backend
        // it's for the checked calculation in UI
        product.checked = !product.checked;
      },
      error: (error) => {
        this.appStateService.setProductState({
          status: 'ERROR',
          error: error,
        });
      },
    });
  }

  handleDeleteProduct(product: Product) {
    // optimistic update
    const updatedProducts = this.appStateService.productState.products.filter((p) => p.id !== product.id);
    this.appStateService.productState.products = updatedProducts;
  
    this.productService.deleteProduct(product).subscribe({
      next: () => {
        // if the last page has only one product, and we delete it, we should go back to the previous page
        if (!this.appStateService.productState.products.length) {
          this.appStateService.productState.currentPage--;
        }
        // if the first page has only one product, and we delete it, we should stay on the first page
        this.searchProducts();
      },
      error: (error) => {
        this.appStateService.setProductState({
          status: 'ERROR',
          error: error,
        });

        // If there's an error, revert the products list to its original state
        this.appStateService.productState.products = [...this.appStateService.productState.products, product];
      },
    });
  }

  handleGoToPage(pageNumber: number) {
    this.appStateService.productState.currentPage = pageNumber;
    this.searchProducts();
    }

    handleEditProduct(product: Product) {
      this.router.navigate(['/editProduct', product.id]);
}
}
