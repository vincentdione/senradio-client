import { RadioComponent } from './../dialog/radio/radio.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { RadioService } from './../../services/radio.service';
import { HopitalService } from './../../services/hopital.service';
import { PatientService } from './../../services/patient.service';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-radio-docteur',
  templateUrl: './manage-radio-docteur.component.html',
  styleUrls: ['./manage-radio-docteur.component.scss']
})
export class ManageRadioDocteurComponent implements OnInit {

  displayColumns : string [] = ["titre","description","prix","secretaire","docteur","patient","hopital","status","action"];
  dataSource:any;
  responseMessage : any;
  hopitalId : any
  userId : any

  constructor(private patientService: PatientService,private hopitalService: HopitalService,private radioService:RadioService, private router: Router,
    private snackbarService : SnackbarService,
    private dialog : MatDialog, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.hopitalId = localStorage.getItem("hopitalId")
    this.userId = localStorage.getItem("userId")
    if(this.hopitalId){
      this.tableData()
    }
    else {
      this.ngxService.stop()
    }
  }

  tableData(){
    this.radioService.getRadioByDoctorHopital(this.hopitalId,this.userId).subscribe((res:any) => {
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

  getStatus(status:boolean){
    if(status === false){
     return "EN_COURS"
    }
    else {
     return "TERMINE"
    }
 }

}
