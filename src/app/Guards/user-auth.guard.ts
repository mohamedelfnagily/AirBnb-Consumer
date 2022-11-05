import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private _AuthserviceService:AuthenticationService,private _Router:Router)
  {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._AuthserviceService.userData.getValue()!=null && localStorage.getItem('userRole')=='User')
      {
        return true;
      }
      else{
        this._Router.navigate(['/UnAuthorized']);
        return false;
      }
  }
  
}
