import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UserService]
})
export class MenuComponent implements OnInit {
  public logged: boolean = false;
  public loading: boolean = true;

  constructor(
    private _UserService: UserService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.checkApi();
  }

  logOut() {
    this._UserService.logOut();
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
