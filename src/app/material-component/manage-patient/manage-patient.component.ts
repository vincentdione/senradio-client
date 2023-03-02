import { ConfirmationComponent } from './../dialog/confirmation/confirmation.component';
import { PatientComponent } from './../dialog/patient/patient.component';
import { filter } from 'rxjs/operators';
import { GlobalConstants } from './../../shared/global-constants';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-patient',
  templateUrl: './manage-patient.component.html',
  styleUrls: ['./manage-patient.component.scss']
})
export class ManagePatientComponent implements OnInit {

  displayColumns : string [] = ["nom","prenom","email","telephone","action"];
  dataSource:any;
  responseMessage : any;

  constructor(private patientService: PatientService, private router: Router,
    private snackbarService : SnackbarService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.patientService.getPatients().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(res)
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

  handleAddPatient(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Ajouter'
    }
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(PatientComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddPatient.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )

  }

  handleEditPatient(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Modifier',
      data: values
    }
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(PatientComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onUpdatePatient.subscribe(
      (res:any)=>{
        this.tableData()
      }
    )
  }

  handleDeletePatient(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"Supprimer le patient  "+values.pat_prenom +" "+values.pat_nom
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
       this.ngxService.start();
       this.deletePatient(values.id)
       dialogRef.close();

    })
  }

  deletePatient(id:any){
    this.patientService.deletePatient(id).subscribe((res:any)=>{
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
}
