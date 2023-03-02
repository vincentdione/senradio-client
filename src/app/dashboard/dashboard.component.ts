import { RadioService } from './../services/radio.service';
import { HopitalService } from './../services/hopital.service';
import { PatientService } from './../services/patient.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from './../shared/global-constants';
import { SnackbarService } from './../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from './../services/dashboard.service';
import { Component, AfterViewInit } from '@angular/core';
import { error } from 'console';
import { getNsPrefix } from '@angular/compiler';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  responseMessage : any;
  dataUser : any;
  dataPatients : any;
  dataHospitals : any;
  dataRadios : any;
  sumRadio : number = 0;

	ngAfterViewInit() { }

	constructor(private dashboardService : DashboardService
    ,private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private patientService: PatientService,
    private hopitalService:HopitalService,private radioService:RadioService) {
    this.ngxService.start()
    this.dashboardData()
	}

  dashboardData(){
    this.userService.getUsers().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataUser =res
    },(error)=>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })

    this.patientService.getPatients().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataPatients =res
    },(error)=>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })


    this.patientService.getPatients().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataPatients =res
    },(error)=>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })



    this.hopitalService.getHospitals().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataHospitals =res
    },(error)=>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message
    }
    else {
      this.responseMessage = GlobalConstants.genericErrorMessage
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })


    this.radioService.getRadios().subscribe((res:any) => {
      this.ngxService.stop()
      this.dataRadios =res

      this.sumRadio = res.reduce((acc:number, val:any) => {
        return acc + parseInt(val.rad_prix);
      }, 0);

    },(error)=>{
      this.ngxService.stop()
      console.log(error)
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
