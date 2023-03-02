import { ConfirmationComponent } from './../dialog/confirmation/confirmation.component';
import { UserComponent } from './../dialog/user/user.component';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  displayColumns : string [] = ["nom","prenom","email","telephone","username","role","action"];
  dataSource:any;
  responseMessage : any;

  constructor(private userService: UserService, private router: Router,
    private snackbarService : SnackbarService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.userService.getUsers().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(res)
      console.log(this.dataSource)
    },(error)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }

  applyFilter(event:Event){
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  handleAddUser(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Ajouter'
    }
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(UserComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddUser.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

  handleEditUser(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Modifier',
      data: values
    }
    console.log("update user dialog")
    console.log(values)
    console.log("update user dialog")
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(UserComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onUpdateUser.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

  handleDeleteUser(values:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Supprimer l'utilisateur "+values.username
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.deleteUser(values.id)
       dialogRef.close();

    })

  }

  deleteUser(id:any){

    this.userService.deleteUser(id).subscribe((res:any)=>{
        this.ngxService.stop()
        this.tableData()
        this.responseMessage = res?.message
        this.snackbarService.openSnackbar(this.responseMessage,"success")
    },(error:any)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })

  }

  onChange(values:any,id:any){
    console.log("values ==========")
    console.log(values)
    var data = {
      status : values.toString(),
     id:id
    }
    console.log(data)
    if(values === true){
        this.isActive(data.id)
    }
    else {
      this.isNotActive(data.id)
    }

   }

   isActive(id:any){
    this.userService.changeStatusIsactive(id).subscribe((res:any)=>{
      this.ngxService.stop()
      this.responseMessage = res?.message
      this.snackbarService.openSnackbar(this.responseMessage,"success")
   },(error:any)=>{
    this.ngxService.stop()
    if(error.error?.message){
      this.responseMessage = error.error?.message
  }
  else {
    this.responseMessage = GlobalConstants.genericErrorMessage
  }
  this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
  })
   }

   isNotActive(id:any){
    this.userService.changeStatusIsDeactive(id).subscribe((res:any)=>{
      this.ngxService.stop()
      this.responseMessage = res?.message
      this.snackbarService.openSnackbar(this.responseMessage,"success")
   },(error:any)=>{
    this.ngxService.stop()
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
