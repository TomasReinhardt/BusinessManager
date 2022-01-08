import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public User: User = {name:"",username:"",password:""}
  public Error: string = "";
  public success: string = "";
  constructor(
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
  }

  registerUser(form:any){
    if( this.User.name.length >= 3 && this.User.username.length >= 4 && this.User.password.length >= 8) {
      this._UserService.addUser(this.User).subscribe(
        response => {
          form.reset();
          this.success = "Usuario Registrado"
          setTimeout(()=>{
            this.success = ""
          },2000)
        },
        err => {
          console.log("-------------------------");
          console.log(err);
          console.log("-------------------------");
  
          if(err.error.error == "\"name\" is not allowed to be empty" && err.error.error == "\"username\" is not allowed to be empty" && err.error.error == "\"password\" is not allowed to be empty"){
            this.Error = "Credenciales no validas"
          }
        }
      )
    }else {
      this.Error = "Credenciales no validas"
    }
    
  }
}
