import { Injectable } from '@angular/core';
import { ProductState } from '../model/productState.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState: ProductState = {
    products: [],
    keyword: '',
    totalPages: 0,
    pageSize: 4,
    currentPage: 1,
    totalProducts: 0,
    status: "",
    error: ""
  };

  constructor() { }

  public setProductState(state:any){
    this.productState = {...this.productState, ...state};
  }
}
