import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthModuleGuard implements CanLoad {
  constructor(private _AuthserviceService:AuthenticationService,private _Router:Router){

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this._AuthserviceService.userData.getValue()!=null)
    {
      return true;
    }
    else{
      this._Router.navigate(['/Login']);
      return false;
    }
  }

  
}
