import { UserService } from 'src/app/services/user.service';
import { ChangePasswordComponent } from './../../../material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from './../../../material-component/dialog/confirmation/confirmation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit {
  role : any;

  userId : any
  user : any
  constructor(private router: Router, private dialog : MatDialog,private userService:UserService) {

  }


  ngOnInit(): void {

    this.userId = localStorage.getItem("userId")
    this.getUser()

    }

  logout(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message : 'vous déconnecter'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user)=>{
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/'])
    })
  }

  changePassword(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    const dialogRef = this.dialog.open(ChangePasswordComponent,dialogConfig);
  }

  getUser(){
    this.userService.getOne(this.userId).subscribe((res:any)=>{
        this.user = res
        console.log(this.user)
    },(err:any)=>{
      console.log(err)
    })
  }

}
