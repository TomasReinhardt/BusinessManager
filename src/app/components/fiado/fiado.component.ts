import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { SaleService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-fiado',
  templateUrl: '../sales/sales.component.html',
  styleUrls: ['../sales/sales.component.css'],
  providers: [SaleService,UserService]
})
export class FiadoComponent implements OnInit {
  public Sales: Sale[] = [];
  public Dates: string[] = [];
  public dateActual: string = "";

  constructor(
    private _SaleService : SaleService,
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
    this.getSales()
  }

  getSales() {
    this._SaleService.getSales().subscribe(
      response => {
        for (let i = 0; i < response.sale.length; i++) {
          if(response.sale[i].fiado == false){
            this.Sales.push(response.sale[i])
          }
        }
        this.getDates()
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
    for (let i = 0; i < this.Sales.length; i++) {
      if(this.Dates.findIndex(date => date == this.Sales[i].date) == -1){
        this.Dates.push(this.Sales[i].date);
      }
    }
    this.Dates.reverse();
    this.dateActual = this.Dates[0];
  }

  updateSale(sale: Sale,index:any){
    this.Sales.splice(index,1)
    setTimeout(()=> {
      this._SaleService.updateSale(sale).subscribe(
        response => {
          console.log(response)
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
