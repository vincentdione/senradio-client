import { GlobalConstants } from './../shared/global-constants';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public authService: AuthService,public router: Router,private snackbarService: SnackbarService) { }

  canActivate(route: ActivatedRouteSnapshot):boolean {
    let expectRoleArray = route.data
    expectRoleArray = expectRoleArray.expectedRole;

    console.log("expectRoleArray"+expectRoleArray)

    const token : any = localStorage.getItem("token");
    var tokenPayload : any;
    try {
      console.log("token"+token)
      console.log(jwt_decode(token))
      tokenPayload = jwt_decode(token)
      console.log("tokenPayload"+tokenPayload)
    } catch (error) {
      localStorage.clear();
      console.log("clear token")
      this.router.navigate(["/"])
    }

    let checkRole = false;
    for (let i=0;i< expectRoleArray.length;i++) {
        if(expectRoleArray[i] == tokenPayload.role[0]){
          checkRole = true;
        }
  }
  console.log("tokenPayload"+tokenPayload)
  if(tokenPayload.role[0] == ["ROLE_DOCTEUR"] || tokenPayload.role[0] == ["ROLE_ADMIN"] || tokenPayload.role[0] == ["ROLE_SECRETAIRE"]){
    if(this.authService.isAuthencated() && checkRole ){
      return true;
    }
    this.snackbarService.openSnackbar(GlobalConstants.unauthorized,GlobalConstants.error);
    this.router.navigate(['/workspace/dashboard']);
    return false;
  }
  else {
    this.router.navigate(["/"]);
    console.log("clear 2222 222")
    localStorage.clear();
    return false;
  }
}

}
