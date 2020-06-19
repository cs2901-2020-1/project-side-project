import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService, private router: Router){}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request).pipe(catchError((err: any) => {
            /*
            if (err.status === 401) {
                this.router.navigate(['/']);  
            }
            const error = err.error.message || err.statusText;*/
            return err;
        }))
    }
}