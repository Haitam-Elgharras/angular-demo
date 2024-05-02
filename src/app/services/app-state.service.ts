import { Injectable } from '@angular/core';
import { ProductState } from '../model/productState.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public authState:any={
    username:undefined,
    roles:undefined,
    isAuthenticated:false,
    token:undefined
  }

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

  public setAuthState(state:any){
    this.authState = {...this.authState, ...state};
  }
}
