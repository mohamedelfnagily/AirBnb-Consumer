import {Injectable} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
       constructor(){}
       intercept(req:any, next:any){
        let userToken = localStorage.getItem('userToken');
        var authRequest=req.clone({
            headers:req.headers.set('Authorization',`Bearer ${userToken}`)
        })
           return next.handle(authRequest)
       }
}
