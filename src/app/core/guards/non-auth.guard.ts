import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
    providedIn: "root"
})
export class NonAuthGuard implements CanLoad {
    constructor(private router: Router, private authService: AuthService) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.authService.isAccessTokenExpired()) {
            this.router.navigate(['']);
            return false;
        } else {
            return true;
        }
    }

}