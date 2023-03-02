import { ChangePasswordComponent } from './../../../material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from './../../../material-component/dialog/confirmation/confirmation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role : any;


  constructor(private router: Router, private dialog : MatDialog) {
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

}
