import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { Sale } from "../models/sale";
@Injectable()
export class SaleService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }
    getSales(date:string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'sales/'+date, {headers: headers});
    }
    getSalesClient(client:string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'salesClients/'+client, {headers: headers});
    }
    getClients():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'clients', {headers: headers});
    }
    getDates():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'dates', {headers: headers});
    }
    addSale(sale: any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'addSale',sale,{headers: headers});
    }
    updateSale(sale: any,index: any):Observable<any> {
        var params = JSON.stringify(sale);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'updateSale/'+index,params,{headers: headers});
    }
    deleteSale(id: string):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'deleteSale/'+id, {headers: headers});
    }
}