import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public total: number = 0;
  public Trolley: any[]  = []
  public nameSearch = "";

  public Products: Product[]  = [
    {name: "Alfajor", price: 20, stock: true, cant:1},
    {name: "Caramelo masticable", price: 5, stock: true, cant:1},
    {name: "Gomitas", price: 5, stock: false, cant:1},
    {name: "Yogurt", price: 300, stock: true, cant:1},
    {name: "Hamburguesa", price: 180, stock: true, cant:1},
    {name: "Asado", price: 1000, stock: true, cant:1},
    {name: "Mogul", price: 10, stock: true, cant:1},
    {name: "Coca-Cola", price: 400, stock: false, cant:1},
    {name: "Prity", price: 50, stock: true, cant:1},
    {name: "Coca-Cola", price: 400, stock: false, cant:1},
    {name: "Prity", price: 50, stock: true, cant:1}
  ]

  constructor(
    public _router: Router,
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
