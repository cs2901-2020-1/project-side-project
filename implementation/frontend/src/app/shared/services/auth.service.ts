import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';


@Injectable({
    providedIn: 'root',
})
export class AuthService {

    static headers() {
        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Authorization': 'Bearer ' + localStorage.getItem('currentUserToken')
        };
        const requestOptions = {
          headers: new HttpHeaders(headerDict),
        };
        return requestOptions;
    }

    static path = environment.APIEndpoint + '/auth';

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string) {
        return this.http.post<any>(AuthService.path + '/login', { email: email, password: password })
            .pipe(map(user => {
                this.storeData(user)
            }
        ));
    }

    studentSignup(request: any) {
        return this.http.post<any>(AuthService.path + '/student', request)
            .pipe(map(user => {
                this.storeData(user)
            }
        ));
    }

    teacherSignup(request: any) {
        return this.http.post<any>(AuthService.path + '/teacher', request)
            .pipe(map(user => {
                this.storeData(user)
            }
        ));
    }

    storeData(user: any) {
        if (user && user.token) {
            localStorage.setItem('currentUserId', user.userId);
            localStorage.setItem('currentUserToken', user.token);
            localStorage.setItem('currentUserRole', user.role);
            localStorage.setItem('currentUserFullName', user.fullName);
        }
    }

    logout() {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('currentUserToken');
        localStorage.removeItem('currentUserRole');
        localStorage.removeItem('currentUserFullName');
        this.router.navigate(['/']);
    }

    public currentUserId(): number {
        return +localStorage.getItem('currentUserId');
    }

    public currentUserRole(): string {
        return localStorage.getItem('currentUserRole');
    }

    public currentUserFullName(): string {
        return localStorage.getItem('currentUserFullName');
    }

    public currentUserName(): string {
        var fullName = localStorage.getItem('currentUserFullName');
        var separar = fullName.split(" ", 2);
        return separar[0];
    }

    getTokenExpirationDate(token: string): Date {
        let decoded = {exp: undefined};

        decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if(!token) token = localStorage.getItem('currentUserToken');
        if(!token) return true;

        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }
}