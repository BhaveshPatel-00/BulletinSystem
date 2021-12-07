/*
Code Attribution
Academind
Angular & NodeJS - The MEAN Stack Guide [2021 Edition]
https://pro.academind.com/p/angular-nodejs-the-mean-stack-guide-2020-edition
Maximilian Schwarzmüller
https://pro.academind.com/courses/765943/author_bio
*/

/*
Code Attribution
Varsity College APDS7311 LAB GUIDE Part A
https://learn-eu-central-1-prod-fleet01-xythos.learn.cloudflare.blackboardcdn.com/5f5880ccc4141/1747273?X-Blackboard-Expiration=1622300400000&X-Blackboard-Signature=rc5e9W17qyi7M5ZeaCe4iQdgVI6G07FGUMttY4A1cz8%3D&X-Blackboard-Client-Id=515070&response-cache-control=private%2C%20max-age%3D21600&response-content-disposition=inline%3B%20filename%2A%3DUTF-8%27%27ADPS%2520Lab%2520Guide%2520Complete.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210529T090000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAZH6WM4PL5M5HI5WH%2F20210529%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=4656ea88610acfcf56266d9664cf513d76436b18a13e9aa0fd0c31e6dd68220c
Varsity College
https://www.varsitycollege.co.za/
*/

import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private dialog: MatDialog){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        return throwError(error);
      })
    );
  }
}
