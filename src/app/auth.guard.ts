import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _UserService: UserService,
    private _router: Router
  ){}

  canActivate():boolean {
    if(this._UserService.loggedIn()) return true
    else {
      this._router.navigate(['/login']);
      return false;
    }
  }
  
}
