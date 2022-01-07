import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  public total: number = 0;
  public Trolley: any[]  = []
  public Categorys: any[]  = ["Todos"]
  public nameSearch = "";
  public nameCategory = "";

  public Products: Product[]  = []

  constructor(
    public _router: Router,
    private _ProductService: ProductService 
  ) { }

  ngOnInit(): void {
    var aux = sessionStorage.getItem('trolley');
    if(aux){
      this.Trolley = JSON.parse(aux);
      this.calcTotal();
    }
    this.getProducts();
  }

  getProducts() {
    this._ProductService.getProducts().subscribe(
      response => {
        this.Products = response.product;
        this.getCategorys();
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
      }
    )
  }

  getCategorys() {
    for (let i = 0; i < this.Products.length; i++) {
      if(this.Categorys.findIndex(category => category == this.Products[i].category) == -1){
        this.Categorys.push(this.Products[i].category);
      }
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

  filterCategory(category:string) {
    if(category == "Todos"){
      this.nameCategory = "";
    }else {
      this.nameCategory = category;
    }
  }

  removedTrolley(index:any) {
    if(this.Products[index].cant > 0){
      if(this.Trolley.length > 0) {
        var exist = false;
        for (let i = 0; i < this.Trolley.length; i++) {
          if(this.Trolley[i].product.name == this.Products[index].name){
            var exist = true;
            this.Trolley[i].cant -= this.Products[index].cant;
            if(this.Trolley[i].cant == 0){
              this.Trolley.splice(i,1);
            }
          }
        }
      }
      this.calcTotal();
    }
  }

  addTrolley(index:any) {
    if(this.Products[index].cant > 0){
      if(this.Trolley.length > 0) {
        var exist = false;
        for (let i = 0; i < this.Trolley.length; i++) {
          if(this.Trolley[i].product.name == this.Products[index].name){
            var exist = true;
            this.Trolley[i].cant += this.Products[index].cant;
          }
        }
        if(!exist){
          var aux = {
            product: this.Products[index],
            cant: this.Products[index].cant
          }
          this.Trolley.push(aux);
        }
      }
      else {
        var aux = {
          product: this.Products[index],
          cant: this.Products[index].cant
        }
        this.Trolley.push(aux);
      }
      this.calcTotal();
    }
  }

  collect(){
    if(this.Trolley.length > 0) {
      sessionStorage.setItem('trolley',  JSON.stringify(this.Trolley)); 
      this._router.navigate(['sale']);
    }
  }
}
