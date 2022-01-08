import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductService,UserService]
})
export class AddProductComponent implements OnInit {
  public Product: Product = {_id:"",name:"",price:0,stock:false,cant:1,category:""};
  public Error:string ="";
  public success:string ="";
  constructor(
    private _ProductService : ProductService,
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
  }

  addProduct(form:any){
    this._ProductService.addProduct(this.Product).subscribe(
      response => {
        form.reset();
      },
      err => {
        console.log("-------------------------");
        console.log(err);
        console.log("-------------------------");
        this._UserService.checkToken(err.error.error)
      }
    )
  }
}
