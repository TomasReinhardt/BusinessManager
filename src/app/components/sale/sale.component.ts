import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/products';

@Component({
  selector: 'sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
  providers: [ProductService]
})
export class SaleComponent implements OnInit {
  public total: number = 0;
  public Trolley: any[]  = []

  constructor(
    private _router: Router,
    private _ProductService: ProductService 
  ) { }

  ngOnInit(): void {
    var aux = sessionStorage.getItem('trolley');
    if(aux){
      this.Trolley = JSON.parse(aux);
      this.calcTotal();
    }
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
    sessionStorage.setItem("trolley","")
    //se manda la compra a la base de datos
    this._router.navigate(['']);
  }


  removedTrolley(index:any) {
    this.Trolley.splice(index,1);
    this.calcTotal();
    sessionStorage.setItem('trolley',  JSON.stringify(this.Trolley)); 
    this.calcTotal();
  }
}
