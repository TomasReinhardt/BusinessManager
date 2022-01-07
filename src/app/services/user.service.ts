import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { User } from "../models/user";
import { Router } from "@angular/router";
@Injectable({
    providedIn: 'root'
})
export class UserService {
    public url: string;

    constructor(
        private _http: HttpClient,
        private _router: Router
    ){
        this.url = Global.url;
    }

    singUp(user: User):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'login',user, {headers: headers});
    }

    loggedIn():boolean {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) return true
        else return false;
    }

    getToken() {
        return sessionStorage.getItem('token');
    }

    logOut() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        this._router.navigate(['login']);
    }

    checkToken(message:String) {
        if(message == 'token no es valido'){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            this._router.navigate(['login']);
        }
    }

}