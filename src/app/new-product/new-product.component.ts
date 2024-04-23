import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productForm!: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService) {}
  error: any;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control(0),
      checked: this.fb.control(false)
    });
  }

  saveProduct() {
    let product:Product = this.productForm.value;

    this.productService.saveProduct(product).subscribe(
    {
      next: (product: Product) => {
        console.log('product saved', product);
        // enforce rendering the new product in the products list
        product.id = Math.floor(Math.random() * 1000);

        this.productForm.reset();
      },
      error: (error) => {
        console.log('error', error);
        this.error = error;
      }
    }
    );
  }

}
