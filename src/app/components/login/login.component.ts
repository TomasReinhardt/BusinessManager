import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public User: User = {username:"",password:""}
  public ErrorUser: string = "";
  constructor(
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
  }
  checkUser(formLogin: any){
    this._UserService.singUp(this.User).subscribe(
      response => {
        sessionStorage.setItem('token', response.token)
        sessionStorage.setItem('user', response.user)
        formLogin.reset();
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
