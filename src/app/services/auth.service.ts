import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private appState:AppStateService) { }
  async login(username:string,password:string){
    // the firstValueFrom function is used to convert the observable to a promise
    let user:any= await firstValueFrom(this.http.get("http://localhost:3000/users/" + username));
    // this is not a real use case, it's just for explanation purposes
    console.log(user.password)
    console.log(atob(user.password))
    if(password==atob(user.password)){
      // jwtDecode returns only the payload of the token
      let decodeJwt:any = jwtDecode(user.token);
      this.appState.setAuthState({
        username:decodeJwt.sub,
        roles:decodeJwt.roles,
        isAuthenticated:true,
        token:user.token
      });
      return Promise.resolve(true)
    }
    else {
      return Promise.reject("Bad credentials")
    }

  }
}