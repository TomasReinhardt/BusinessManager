import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProductService,UserService]
})
export class EditComponent implements OnInit {
  public Categorys: any[]  = ["Todos"]
  public nameSearch = "";
  public nameCategory = "Todos";
  public Products: Product[]  = []
  public loading: boolean = true;

  constructor(
    private _ProductService: ProductService,
    private _UserService: UserService 
    ) { }

  ngOnInit(): void {
    this.getProducts();
    this.checkApi();
  }

  ngDoCheck() {
    this.filterCategory(this.nameCategory)
  }

  filterCategory(category:string) {
    if(category == "Todos"){
      this.nameCategory = "";
    }else {
      this.nameCategory = category;
    }
  }

  getCategorys() {
    for (let i = 0; i < this.Products.length; i++) {
      if(this.Categorys.findIndex(category => category == this.Products[i].category) == -1){
        this.Categorys.push(this.Products[i].category);
      }
    }
  }

  getProducts() {
    this._ProductService.getProducts().subscribe(
      response => {
        this.Products = response.result;
        this.getCategorys();
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }

  updateStock(product: any){
    setTimeout(()=> {
      this._ProductService.updateProduct(product).subscribe(
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
