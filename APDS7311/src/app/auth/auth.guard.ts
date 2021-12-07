/*
Code Attribution
Academind
Angular & NodeJS - The MEAN Stack Guide [2021 Edition]
https://pro.academind.com/p/angular-nodejs-the-mean-stack-guide-2020-edition
Maximilian Schwarzmüller
https://pro.academind.com/courses/765943/author_bio
*/

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(

    ):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const isAuth = this.authService.getIsAuth();
      if (!isAuth) {
        this.router.navigate(['/login'])
      }
      return isAuth;
  }

}
