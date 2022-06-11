import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { SaleService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';
import { ProductService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-fiado',
  templateUrl: '../sales/sales.component.html',
  styleUrls: ['../sales/sales.component.css'],
  providers: [SaleService,UserService,ProductService]
})
export class FiadoComponent implements OnInit {
  public Sales: any = [];
  public Dates: string[] = [];
  public dateActual: string = "";
  public clientNew: string = "";
  public loading: boolean = true;
  public Products: Product[]  = []
  public total:number = 0;

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
    if(this.clientNew!=this.dateActual){
      this.Sales = [];
      this.total = 0;
      this.getSales();
      this.clientNew = this.dateActual;
    }
  }

  getSales() {
    this._SaleService.getSalesClient(this.dateActual).subscribe(
      response => {
        var sales = response.result;
        this.getArraySales(sales);
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }

  getDates(){
    this._SaleService.getClients().subscribe(
      response => {
        for (let i = 0; i < response.result.length; i++) {
          this.Dates.push(response.result[i].buyer);
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

  updateSale(sale: any,index:any,i:any){
    setTimeout(()=> {
      this._SaleService.updateSale(sale,index).subscribe(
        response => {
          this.Sales.splice(i,1)
        },
        err => {
          console.log("-------------------------");
          console.log(err);
          console.log("-------------------------");
        }
      )
    },500)

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
          var aux2 = aux[0]+' $'+aux[1]+'x'+aux[2];
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

      this.total += sales[i].total;
    }
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

  deleteSale(saleId:string,i:number):void {
    this._SaleService.deleteSale(saleId).subscribe(
      response => {
        this.Sales.splice(i,1)
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
