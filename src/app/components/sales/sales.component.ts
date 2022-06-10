import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';
import { ProductService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [SaleService,UserService,ProductService]
})
export class SalesComponent implements OnInit {
  public Sales: any = [];
  public Dates: string[] = [];
  public dateActual: string = "";
  public dateNew: string = "";
  public loading: boolean = true;
  public Products: Product[]  = []

  constructor(
    private _SaleService : SaleService,
    private _UserService: UserService,
    private _ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.getDates();
    this.checkApi();
    this.getProducts();
  }

  ngDoCheck():void {
    if(this.dateNew!=this.dateActual){
      this.getSales();
      this.dateNew = this.dateActual;
    }
  }

  getDates() {
    this._SaleService.getDates().subscribe(
      response => {
        let fecha = "";
        for (let i = 0; i < response.result.length; i++) {
          if(response.result[i].date.slice(0,10) != fecha){
            this.Dates.push(response.result[i].date.slice(0,10));
            fecha = response.result[i].date.slice(0,10);
          }
        }
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }

  getSales() {
    this._SaleService.getSales(this.dateActual).subscribe(
      response => {
        var sales = response.result;
        this.getArraySales(sales)
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }


  
  getArraySales(sales: any) {
    for (let i = 0; i < sales.length; i++) {
      var auxList = sales[i].listProducts.split('//')
      var auxProducts = [];
      for (let i = 0; i < auxList.length; i++) {
        if(auxList[i] != ""){
          var aux = auxList[i].split('-');
          var productAux = this.Products.find(element => element.id == aux[0]);
          if(productAux){
            aux[0] = productAux.name;
          }
          var aux2 = aux[0]+' -- $'+aux[1]+'x'+aux[2];
          auxProducts.push(aux2)
        }
        
      }

      var sale = {
        id: sales[i].id,
        buyer: sales[i].buyer,
        fiado: sales[i].fiado,
        seller: sales[i].seller,
        total: sales[i].total,
        date: sales[i].date.slice(0,10),
        listProducts: auxProducts
      }
      this.Sales.push(sale)
    }
  }

  updateSale(sale: any, index: any,i: any){
    setTimeout(()=> {
      this._SaleService.updateSale(sale,index).subscribe(
        response => {
        },
        err => {
          console.log("-------------------------");
          console.log(err);
          console.log("-------------------------");
        }
      )
    },500)
  }

  expandSale(i:number){
    var id = 'productSale'+i
    $('#'+id).slideToggle();
  }

  checkApi() {
    this._UserService.checkApi().subscribe(
      response => {
        this.loading = false;
      },
      err => {
        console.log("------------------------------------------------")
        console.log(err)
        console.log("------------------------------------------------")
      }
    )
  }

  getProducts() {
    this._ProductService.getProducts().subscribe(
      response => {
        this.Products = response.result;
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }
}
