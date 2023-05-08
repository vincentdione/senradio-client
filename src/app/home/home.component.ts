import { GlobalConstants } from './../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from './../services/snackbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { LoginComponent } from './../login/login.component';
import { ForgotPasswordComponent } from './../forgot-password/forgot-password.component';
import { SignupComponent } from './../signup/signup.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage : any;

  constructor(private dialog: MatDialog,
    private userService : UserService, private ngxService: NgxUiLoaderService,
    private snackbarService : SnackbarService,
    private formBuilder : FormBuilder,
    private router : Router) { }

  ngOnInit(): void {
    console.log("ok")
    console.log(localStorage.getItem("token"))


    console.log(localStorage.getItem("token") != null)
    if (localStorage.getItem("token") != null) {
      console.log("localStorage.getItem(token)")
      this.userService.checkToken().subscribe((res:any)=>{
         this.router.navigate(["/workspace/dashboard"]);
      },(error)=>{
        console.log(error);
      })
    }
    this.loginForm = this.formBuilder.group({
      username : [null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      password : [null,[Validators.required]]
    })
  }

  onSignup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(SignupComponent,dialogConfig);

  }
  onForgotPassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ForgotPasswordComponent,dialogConfig);
  }

  onLogin(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(LoginComponent,dialogConfig);
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      username : formData.username,
      password : formData.password
    }

    this.userService.login(data).subscribe((res:any) => {
        this.ngxService.stop();
        localStorage.setItem("token",JSON.stringify(res?.token))
        localStorage.setItem("role",JSON.stringify(res?.role[0]))
        localStorage.setItem("userId",JSON.stringify(res?.user?.id))
        localStorage.setItem("hopitalId",JSON.stringify(res?.user?.hopitalId))
        console.log(res)
        console.log(res?.token)
        console.log(res?.role[0])
        console.log(res?.user?.id)
        this.responseMessage = res?.message
        this.snackbarService.openSnackbar(this.responseMessage,"")
        this.router.navigate(["/workspace/dashboard"])

    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
          this.responseMessage = error.error?.message
      }
      else {
        this.responseMessage = GlobalConstants.genericErrorMessage
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })

  }

}
