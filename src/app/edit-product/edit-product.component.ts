import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  productId!: number;
  productFormGroup!: FormGroup;
  constructor(private route: ActivatedRoute, private ps: ProductService, private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params["id"];

    this.ps.getProductById(this.productId)
    .subscribe({
      next: (product) => {
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id),
          name: this.fb.control(product.name, [Validators.required]),
          price: this.fb.control(product.price),
          checked: this.fb.control(product.checked),
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateProduct() {

    let product = this.productFormGroup.value;

    this.ps.updateProduct(product)
    .subscribe({
      next: (product) => {
        console.log('product updated');
      },
      error: (error) => {
        console.log(error);
      }
    });
    }
    

}
