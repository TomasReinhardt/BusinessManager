import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public User: User = {name:"----",username:"",password:""}
  public ErrorUser: string = "";
  constructor(
    private _UserService: UserService,
    private _router: Router
    ) { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    if(this._UserService.loggedIn()) {
      this._router.navigate(['']);
    }
  }

  checkUser(formLogin: any){
    this._UserService.singUp(this.User).subscribe(
      response => {
        sessionStorage.setItem('token', response.token)
        sessionStorage.setItem('user', response.user)
        formLogin.reset();
        this._router.navigate(['']);
      },
      err => {
        console.log("-------------------------");
        console.log(err.error.message);
        console.log("-------------------------");
        this.ErrorUser = err.error.message;
      }
    )
  }
}
