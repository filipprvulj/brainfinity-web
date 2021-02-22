import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginModel } from "../models/LoginModel";
import { RegisterModel } from "../models/RegisterModel";


@Injectable({
    providedIn: "root"
})
export class AuthService {
    jwtHelperService: JwtHelperService

    readonly BASE_URL = environment.apiUrl;
    readonly LOGIN_URL = `${this.BASE_URL}Auth/login`;
    readonly REGISTER_URL = `${this.BASE_URL}Auth/Register`;

    constructor(private httpClient: HttpClient) {
        this.jwtHelperService = new JwtHelperService();
    }

    login(loginModel: LoginModel): Observable<string> {
        return this.httpClient.post<string>(this.LOGIN_URL, loginModel, {
            responseType: 'text' as 'json'
        });
    }

    logout(): void {
        localStorage.removeItem('access_token');
        location.replace(`${location.origin}/auth`);
    }

    storeToken(token) {
        localStorage.setItem('access_token', token);
    }

    isAccessTokenExpired(): boolean {
        const token = localStorage.getItem('access_token');
        return this.jwtHelperService.isTokenExpired(token);
    }

    isLoggedIn(): boolean {
        return localStorage.getItem("access_token") != null;
    }

    register(registerModel: FormData): Observable<string> {
        return this.httpClient.post<string>(this.REGISTER_URL, registerModel, {
            responseType: 'text' as 'json'
        });
    }
}