import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [ProductService,UserService]
})
export class StockComponent implements OnInit {
  public Products: Product[]  = []
  public nameSearch = "";
  public nameStock = "";

  constructor(
    private _ProductService: ProductService,
    private _UserService: UserService
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
        this._UserService.checkToken(err.error.error)
      }
    )
  }

  updateStock(product: Product){
    setTimeout(()=> {
      this._ProductService.updateProduct(product).subscribe(
        response => {
          this.nameStock = product.name;
          setTimeout(()=> {
            this.nameStock = "-------";
          },5000)
        },
        err => {
          console.log("-------------------------");
          console.log(err);
          console.log("-------------------------");
        }
      )
    },500)
  }
}
