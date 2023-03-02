import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm : any = FormGroup;
  responseMessage : any;


  constructor(private formBuilder : FormBuilder,private router: Router,
     private userService : UserService,
     private snackbarService : SnackbarService,
     private dialogRef : MatDialogRef<SignupComponent>, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username : [null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      adresse : [null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email : [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      telephone : [null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password : [null,[Validators.required]]
    })
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      username : formData.username,
      adresse : formData.adresse,
      email : formData.email,
      telephone : formData.telephone,
      password : formData.password
    }

    this.userService.signup(data).subscribe((res:any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        console.log(res)
        this.responseMessage = res?.message
        this.snackbarService.openSnackbar(this.responseMessage,"")
        this.router.navigate(["/"])

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
