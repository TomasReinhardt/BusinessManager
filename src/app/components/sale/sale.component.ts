import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { SaleService } from 'src/app/services/sales.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
  providers: [ProductService,SaleService,UserService]
})
export class SaleComponent implements OnInit {
  public total: number = 0;
  public Trolley: any[]  = [];
  public Sale = {total:0,listProducts:"",fiado:false,seller:"",buyer:""};
  public loading: boolean = true;

  constructor(
    private _router: Router,
    private _UserService: UserService,
    private _SaleService: SaleService
  ) { }

  ngOnInit(): void {
    var aux = sessionStorage.getItem('trolley');
    var aux2 = sessionStorage.getItem('user');
    if(aux && aux2){
      this.Trolley = JSON.parse(aux);
      this.Sale.seller = aux2;
      this.calcTotal();
    }
    this.checkApi();
  }

  addSale() {
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
        this._UserService.checkToken(err.error.error)
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
    this._router.navigate(['products']);
  }

  end(){
    sessionStorage.setItem("trolley","");
    //se manda la compra a la base de datos
    var listProducts = "";
    for (let i = 0; i < this.Trolley.length; i++) {
      listProducts += this.Trolley[i].product.name+'-'+this.Trolley[i].product.price+'-'+this.Trolley[i].cant+'//'
    }
    if(this.Sale.buyer == ""){
      this.Sale.buyer = "--"
    }
    this.Sale.listProducts = listProducts;
    this.addSale();
    this._router.navigate(['']);
  }

  removedTrolley(index:any) {
    this.Trolley.splice(index,1);
    this.calcTotal();
    sessionStorage.setItem('trolley',  JSON.stringify(this.Trolley)); 
    this.calcTotal();
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
