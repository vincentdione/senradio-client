import { FormGroup, FormBuilder } from '@angular/forms';
import { RadioComponent } from './../dialog/radio/radio.component';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from './../../services/snackbar.service';
import { Router } from '@angular/router';
import { RadioService } from './../../services/radio.service';
import { HopitalService } from './../../services/hopital.service';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-historique',
  templateUrl: './manage-historique.component.html',
  styleUrls: ['./manage-historique.component.scss']
})
export class ManageHistoriqueComponent implements OnInit {


  displayColumns : string [] = ["titre","description","prix","secretaire","patient","hopital","status","action"];
  dataSource:any;
  responseMessage : any;
  dataPatients : any [] = [];
  dataHopitals : any [] = [];
  statut : any[] = ["EN_COURS","TERMINE"];

  searchForm: any = FormGroup

  constructor(private patientService: PatientService,private hopitalService: HopitalService,private radioService:RadioService, private router: Router,
    private snackbarService : SnackbarService, private ngxService: NgxUiLoaderService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
    this.searchForm = this.formBuilder.group({
      patientId :[null],
      hopitalId :[null],
      status :[null],
    })
  }

  tableData(){
    this.radioService.getRadios().subscribe((res:any) => {
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

    this.getHospitals()
    this.getPatients()

  }


  getPatients(){
    this.patientService.getPatients().subscribe((res:any)=>{
      this.dataPatients = res
    },(error)=>{
      if(error.error?.message){
          this.responseMessage = error.error?.message
      }
      else {
        this.responseMessage = GlobalConstants.genericErrorMessage
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }

  getHospitals(){
    this.hopitalService.getHospitals().subscribe((res:any)=>{
      this.dataHopitals = res
    },(error)=>{
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





  onSearch(){
      //this.ngxService.start()
      var formData = this.searchForm.value
      var data = {
        hopitalId: formData.hopitalId,
        patientId: formData.patientId,
        status: formData.status,
      }

      console.log(data)

      this.radioService.searchRadio(data).subscribe((res:any) =>{
        //this.ngxService.stop()
        console.log(" =================================================================")
        console.log(res)
        this.dataSource = new MatTableDataSource(res)

      },(error)=>{
          console.log(error)
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

  onChange(value:any) {
    console.log(value)
     /* this.hopitalService.getOne(value).subscribe((res:any) => {
         this.oneHospital = res.hop_prix
         console.log(res)
         console.log(this.oneHospital)
         this.radioForm.controls['rad_prix'].setValue(res.hop_prix)
     },(error)=>{
       console.log("error"+error)
     }) */
 }

}
