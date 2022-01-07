import { Component } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'businessmanager';
  public logged: boolean = false;
  constructor(
    private _UserService: UserService
  ){}

  ngDoCheck(): void {
    this.logged = this._UserService.loggedIn();
  }

  extendMenu(){
    $('.menuExtend').slideToggle();
  }

  logOut() {
    this._UserService.logOut();
  }
}
