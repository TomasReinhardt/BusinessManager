import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { SaleService } from 'src/app/services/sales.service';
import * as $ from 'jquery';

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [SaleService]
})
export class SalesComponent implements OnInit {
  public Sales: Sale[] = [];
  public Dates: string[] = [];
  public dateActual: string = "";
  constructor(
    private _SaleService : SaleService
  ) { }

  ngOnInit(): void {
    this.getSales()
  }

  getSales() {
    this._SaleService.getSales().subscribe(
      response => {
        this.Sales = response.sale;
        this.getDates()
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
      }
    )
  }

  getDates(){
    for (let i = 0; i < this.Sales.length; i++) {
      if(this.Dates.findIndex(date => date == this.Sales[i].date) == -1){
        this.Dates.push(this.Sales[i].date);
      }
    }
    this.Dates.reverse();
    this.dateActual = this.Dates[0];
  }

  updateSale(sale: Sale){
    setTimeout(()=> {
      this._SaleService.updateSale(sale).subscribe(
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
}
