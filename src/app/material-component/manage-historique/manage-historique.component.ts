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
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-historique',
  templateUrl: './manage-historique.component.html',
  styleUrls: ['./manage-historique.component.scss']
})
export class ManageHistoriqueComponent implements OnInit {


  displayColumns : string [] = ["titre","description","prix","secretaire","docteur","patient","hopital","status","action"];
  dataSource:any;
  responseMessage : any;
  dataPatients : any [] = [];
  dataHopitals : any [] = [];
  statut : any[] = ["EN_COURS","TERMINE"];

  searchForm: any = FormGroup

  total : number = 0;
  radioDataExport:any;


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
      this.radioDataExport = res
      this.dataSource = new MatTableDataSource(res)
      this.total = res.reduce((acc:number, val:any) => {
        return acc + parseInt(val.rad_prix);
      }, 0);
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
      this.ngxService.start()
      var formData = this.searchForm.value
      var data = {
        hopitalId: formData.hopitalId,
        patientId: formData.patientId,
        status: formData.status,
      }

      console.log(data)

      this.radioService.searchRadio(data).subscribe((res:any) =>{
        this.ngxService.stop()
        this.radioDataExport = res
        this.dataSource = new MatTableDataSource(res)
        this.total = res.reduce((acc:number, val:any) => {
          return acc + parseInt(val.rad_prix);
        }, 0);

      },(error)=>{
        this.ngxService.stop()
        this.snackbarService.openSnackbar("Veuillez selectionner un champ pour rechercher",GlobalConstants.error)
          console.log(error)
      })

  }


  handleImport(){
     this.radioService.generateRadio(this.radioDataExport).subscribe((res:any) => {
      console.log("res")
      //const file = new Blob([res], { type: 'application/pdf' });

      saveAs(res,URL.createObjectURL(res?.uuid));
      this.snackbarService.openSnackbar("Importation réussie avec success","")
    },(error:any)=>{
      this.snackbarService.openSnackbar("Erreur lors de l'importation",GlobalConstants.error)
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
