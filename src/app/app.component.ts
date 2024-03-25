import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions: Array<any> = [
    {title: "Home", path: "/home",icon: "house"},
    {title: "Products", path: "/products", icon: "box"},
    {title: "New Product", path: "/newProduct", icon: "plus-circle"},
  ];

}
