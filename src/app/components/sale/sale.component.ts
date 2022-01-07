import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Sale } from 'src/app/models/sale';
import { ProductService } from 'src/app/services/products';
import { SaleService } from 'src/app/services/sales';

@Component({
  selector: 'sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
  providers: [ProductService,SaleService]
})
export class SaleComponent implements OnInit {
  public total: number = 0;
  public Trolley: any[]  = [];
  public Sale: Sale = { _id:"",total:0,listProducts:[],date:"",fiado:false};
  public Products: Product[] = [];

  constructor(
    private _router: Router,
    private _ProductService: ProductService,
    private _SaleService: SaleService
  ) { }

  ngOnInit(): void {
    var aux = sessionStorage.getItem('trolley');
    if(aux){
      this.Trolley = JSON.parse(aux);
      this.calcTotal();
    }
  }

  addSale() {
    this.Sale.listProducts = this.Trolley;
    this.Sale.total = this.total;
    this._SaleService.addSale(this.Sale).subscribe(
      response => {
        console.log(response)
        this._router.navigate(['']);
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
      }
    )
  }

  calcTotal() {
    this.total = 0;
    if(this.Trolley.length > 0){
      for (let i = 0; i < this.Trolley.length; i++) {
        this.total += this.Trolley[i].product.price * this.Trolley[i].cant
      }
    }
  }

  back(){
    this._router.navigate(['']);
  }

  end(){
    sessionStorage.setItem("trolley","");
    this.addSale();
    //se manda la compra a la base de datos
  }


  removedTrolley(index:any) {
    this.Trolley.splice(index,1);
    this.calcTotal();
    sessionStorage.setItem('trolley',  JSON.stringify(this.Trolley)); 
    this.calcTotal();
  }
}
