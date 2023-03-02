import { ImgViewComponent } from './../img-view/img-view.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalConstants } from './../../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from './../../../services/snackbar.service';
import { RadioService } from './../../../services/radio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-radio-detail',
  templateUrl: './radio-detail.component.html',
  styleUrls: ['./radio-detail.component.scss']
})
export class RadioDetailComponent implements OnInit {

  responseMessage:any;
  radio:any

  radioForm:any = FormGroup;
  action :any = "Sauvegarder";
  docteur : any;



  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbarService:SnackbarService,
    private  ngxService: NgxUiLoaderService,
    private radioService:RadioService,private dialog:MatDialog,private router: Router) {

    }

  ngOnInit(): void {
    this.ngxService.start()
    this.getDetail()
    this.docteur = localStorage.getItem("userId")
      this.radioForm = this.formBuilder.group({
      rad_interpretation :[this.radio?.rad_interpretation],
      rad_img :[null],
      rad_status :[null],
    })
  }

  getDetail(){
    this.route.params.subscribe(
      (params) => {

        this.radioService.getDetails(params.id).subscribe((res:any) => {
            this.ngxService.stop()
            this.radio = res
            console.log(res)
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
    )
  }

  handleRadioSave(){
    this.ngxService.start()
    var formData = this.radioForm.value
    var data = {
      id: this.radio.id,
      rad_interpretation: formData.rad_interpretation,
      rad_status : false,
      docteurId : this.docteur,

    }
    if(data.rad_interpretation === null || data.rad_interpretation === '' || data.rad_interpretation === undefined){
      this.snackbarService.openSnackbar("Veuillez mettre quelque chose!",GlobalConstants.error)
      this.ngxService.stop()
      return
    }
    this.radioService.updateRadio(data).subscribe((res:any) => {
      this.ngxService.stop()
      this.snackbarService.openSnackbar("Interprétation ajoutée avec success",GlobalConstants.error)
      this.getDetail()

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

  handleRadioFinish(){
    this.ngxService.start()
    var formData = this.radioForm.value
    var data = {
      id: this.radio.id,
      rad_interpretation: formData.rad_interpretation,
      rad_status : true,
      docteurId : this.docteur,

    }
    if(data.rad_interpretation !== '' || data.rad_interpretation !== undefined || data.rad_interpretation    !== null){
      this.radioService.updateRadio(data).subscribe((res:any) => {
        this.ngxService.stop()
        this.snackbarService.openSnackbar("Interprétation ajoutée avec success",GlobalConstants.error)
        this.getDetail()

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

  onView(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "90%"
      dialogConfig.height = "95%"
      dialogConfig.data = {
        action:'Voir',
        data: '../../../../assets/uploads/'+this.radio?.rad_img
      }
      const dialogRef = this.dialog.open(ImgViewComponent,dialogConfig);
      this.router.events.subscribe(()=>{
        dialogRef.close();
      })

  }

}
