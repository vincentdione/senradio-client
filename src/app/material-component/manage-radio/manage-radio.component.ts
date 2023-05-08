import { ImputerDocteurComponent } from './../components/imputer-docteur/imputer-docteur.component';
import { ConfirmationComponent } from './../dialog/confirmation/confirmation.component';
import { RadioComponent } from './../dialog/radio/radio.component';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { RadioService } from './../../services/radio.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { HopitalService } from './../../services/hopital.service';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-radio',
  templateUrl: './manage-radio.component.html',
  styleUrls: ['./manage-radio.component.scss']
})
export class ManageRadioComponent implements OnInit {

  displayColumns : string [] = ["titre","description","prix","secretaire","docteur","patient","hopital","status","action"];
  dataSource:any;
  responseMessage : any;
  hopitalId : any

  constructor(private patientService: PatientService,private hopitalService: HopitalService,private radioService:RadioService, private router: Router,
    private snackbarService : SnackbarService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.hopitalId = localStorage.getItem("hopitalId")
    if(this.hopitalId){
      this.tableData()
    }
    else {
      this.ngxService.stop()
    }
  }

  tableData(){
    this.radioService.getRadioByHopital(this.hopitalId).subscribe((res:any) => {
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

  handleAddRadio(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Ajouter'
    }
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(RadioComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddRadio.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

  handleEditRadio(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Modifier',
      data: values
    }
    console.log("update Radio dialog")
    console.log(values)
    console.log("update Radio dialog")
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(RadioComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onUpdateRadio.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

  handleDeleteRadio(values:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Supprimer  "+values.rad_titre
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.deleteRadio(values.id)
       dialogRef.close();

    })

  }

  deleteRadio(id:any){

    this.radioService.deleteRadio(id).subscribe((res:any)=>{
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

  getStatus(status:boolean){
     if(status === false){
      return "EN_COURS"
     }
     else {
      return "TERMINE"
     }
  }

  onImpute(value:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:"Imputer l'examen à un docteur",
      idRadio : value.id
    }
    dialogConfig.width = "1000px"
    const dialogRef = this.dialog.open(ImputerDocteurComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onImputeRadio.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

}
