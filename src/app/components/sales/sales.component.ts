import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [SaleService,UserService]
})
export class SalesComponent implements OnInit {
  public Sales: any = [];
  public Dates: string[] = [];
  public dateActual: string = "";
  public loading: boolean = true;

  constructor(
    private _SaleService : SaleService,
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
    this.getSales()
    this.checkApi();
  }

  getSales() {
    this._SaleService.getSales().subscribe(
      response => {
        var sales = response.result;
        this.getDates(sales)
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

  getDates(sales:any){
    for (let i = 0; i < sales.length; i++) {
      var date = sales[i].date.slice(0,10);
      if(!this.Dates.find(element => element == date)){
        this.Dates.push(date)
      }
    }
    this.dateActual = this.Dates[0];
  }
  
  getArraySales(sales: any) {
    for (let i = 0; i < sales.length; i++) {
      var auxList = sales[i].listProducts.split('//')
      var auxProducts = [];

      for (let i = 0; i < auxList.length; i++) {
        if(auxList[i] != ""){
          var aux = auxList[i].split('/');
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
}
