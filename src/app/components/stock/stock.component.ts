import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/products';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [ProductService]
})
export class StockComponent implements OnInit {
  public Products: Product[]  = []
  public nameSearch = "";

  constructor(
    private _ProductService: ProductService 
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._ProductService.getProducts().subscribe(
      response => {
        this.Products = response.product;
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
      }
    )
  }
}
