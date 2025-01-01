import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  constructor(private loginService:LoginService, private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //guard is used to check the conditions for accessing the url
      // only admin can access this url
      if(this.loginService.isLoggedIn() && this.loginService.getUserRole()=='ADMIN'){
        return true;
      }
    
      this.router.navigate(['login'])
      return false;
  }
  
}
