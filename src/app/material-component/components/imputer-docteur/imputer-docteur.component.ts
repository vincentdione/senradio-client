import { RadioService } from './../../../services/radio.service';
import { GlobalConstants } from './../../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from './../../../services/snackbar.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-imputer-docteur',
  templateUrl: './imputer-docteur.component.html',
  styleUrls: ['./imputer-docteur.component.scss']
})
export class ImputerDocteurComponent implements OnInit {

  onImputeRadio= new EventEmitter();
  displayColumns : string [] = ["nom","prenom","telephone","username","role","hopital","imputer"];
  dataSource:any;
  responseMessage : any;
  hopitalId: any
  dataDialog : any = {}


  constructor(private userService: UserService, private router: Router,  private dialogRef: MatDialogRef<ImputerDocteurComponent>,
    private snackbarService : SnackbarService, private radioService:RadioService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService,@Inject(MAT_DIALOG_DATA) public dialogData:any) { }

    ngOnInit(): void {
      this.ngxService.start()

      if(this.dialogData){
        this.dataDialog = this.dialogData
        console.log(this.dataDialog)
      }

      this.hopitalId = localStorage.getItem("hopitalId")
      if(this.hopitalId){
        this.tableData()
      }
      else {
        this.ngxService.stop()

      }
    }

    tableData(){
      this.userService.getUsersByRole(this.hopitalId).subscribe((res:any) => {
        this.ngxService.stop()
        this.dataSource = new MatTableDataSource(res)
        console.log(this.dataSource)
      },(error)=>{
        this.ngxService.stop()
        console.log("eroorrrrrr ======="+JSON.stringify(error))
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

    handleImputeUser(){

    }

    onChange(values:any,id:any){
      console.log("values ==========")
      console.log(values)
      var data = {
        status : values.toString(),
       id:id
      }
      console.log(data)
     }

     addImpute(value:any){

      var data = {
        docteurId : value,
        id: this.dataDialog.idRadio
      }

      this.radioService.updateRadio(data).subscribe((res:any)=>{
        this.dialogRef.close()
        this.onImputeRadio.emit();
        this.responseMessage = res.message
        this.snackbarService.openSnackbar("Examen imputé avec success","success")
     },(error)=>{
       this.dialogRef.close();
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
