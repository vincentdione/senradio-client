import { GlobalConstants } from './../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  responseMessage : any;


  constructor(private formBuilder : FormBuilder,private router: Router,
    private userService : UserService,
    private snackbarService : SnackbarService,
    private dialogRef : MatDialogRef<LoginComponent>, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username : [null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      password : [null,[Validators.required]]
    })
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
        this.dialogRef.close();
        console.log(res)

        localStorage.setItem("token",JSON.stringify(res?.token))
        localStorage.setItem("role",JSON.stringify(res?.role[0]))
        localStorage.setItem("userId",JSON.stringify(res?.user?.id))
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
