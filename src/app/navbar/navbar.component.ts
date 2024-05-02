import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions: Array<any> = [
    {title: "Home", path: "/home",icon: "house"},
    {title: "Products", path: "/admin/products", icon: "box"},
    {title: "New Product", path: "/admin/newProduct", icon: "plus-circle"},
  ];

  constructor(public ls: LoadingService){};
}
