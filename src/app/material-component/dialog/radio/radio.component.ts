import { RadioService } from './../../../services/radio.service';
import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { HopitalService } from './../../../services/hopital.service';
import { PatientService } from './../../../services/patient.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  onAddRadio= new EventEmitter();
  onUpdateRadio= new EventEmitter();
  radioForm:any = FormGroup;
  dialogAction : any = "Ajouter"
  action :any = "Ajouter";
  responseMessage:any;
  patients : any [] = [];
  hopitaux : any [] = [];
  oneHospital: any

  secretaire : any;
  docteur : any;
  tokenPayload : any;

  imgSrc : any = './assets/img/default-image.jpeg';
  selectedImg : any;
  nameFile : any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,
  private userService:UserService,
  private radioService:RadioService,
  private patientService:PatientService,
  private hopitalService:HopitalService,
  private dialogRef: MatDialogRef<RadioComponent>,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    const token : any = localStorage.getItem("token");
    this.secretaire = localStorage.getItem("userId")
    this.docteur = localStorage.getItem("userId")

    console.log("localstore " + this.secretaire)
    console.log(localStorage.getItem("userId"));

    this.radioForm = this.formBuilder.group({
      rad_titre :[null,[Validators.required]],
      rad_description :[null],
/*       rad_interpretation :[null],
 */   rad_img :[null],
      hopitalId :[null],
      patientId :[null],
      rad_prix :[null],
    })

    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      this.radioForm.patchValue(this.dialogData.data)
    }
    this.getPatients()
    this.getHospitals()
  }


  getPatients(){
    this.patientService.getPatients().subscribe((res:any)=>{
      this.patients = res
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
      this.hopitaux = res
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


  handleRadioSubmit(){

    if(this.dialogAction === "Modifier"){
       this.edit()
    }
    else {
      console.log("add")
      this.add()
    }

  }

  add(){
    var formData = this.radioForm.value;
    console.log(formData)
    var dataForm = new FormData();
    //this.radioForm.setValue('hopitalId')
   // this.radioForm.addControl('hop_prix',[value.hop_prix]);
   dataForm.append("file", this.selectedImg);

   this.radioService.uploadImg(dataForm).subscribe((res:any) => {
       console.log("================================================")
       this.nameFile = res
       console.log("================================================"+this.nameFile)
       var data = {
        rad_titre :formData.rad_titre,
        rad_description :formData.rad_description,
        rad_img :this.nameFile,
  /*       rad_interpretation :formData.rad_interpretation,
   */   hopitalId :formData.hopitalId,
        patientId :formData.patientId,
        secretaireId : this.secretaire,
        rad_prix: this.oneHospital
      }
      console.log("---------------------------")
      console.log(data)
      console.log("---------------------------")

      this.radioService.addRadio(data).subscribe((res:any)=>{
         this.dialogRef.close()
         this.onAddRadio.emit();
         this.responseMessage = res.message
         this.snackbarService.openSnackbar(this.responseMessage,"success")
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

      console.log("================================================")
      this.nameFile = res
      console.log("================================================"+this.nameFile)
   },(error)=>{
      console.log(error)
   })



  }

  edit(){

    var formData = this.radioForm.value;
    var data : any
    console.log(this.nameFile)
    this.imgSrc = './assets/uploads/'+this.nameFile
    console.log(this.imgSrc)
    if(formData.rad_interpretation != null){
      data = {
        id : this.dialogData.data.id,
        rad_titre :formData.rad_titre,
        rad_description :formData.rad_description,
        rad_img :this.nameFile,
/*      rad_interpretation :formData.rad_interpretation,
 */     hopitalId :formData.hopitalId,
        patientId :formData.patientId,
        docteurId : this.docteur,
        rad_prix: this.oneHospital,
        rad_status : true
      }
      console.log("Update user docteur")
      console.log(data)
    }
    else {
      data = {
        id : this.dialogData.data.id,
        rad_titre :formData.rad_titre,
        rad_description :formData.rad_description,
        rad_img :this.nameFile,
/*         rad_interpretation :formData.rad_interpretation,
 */     hopitalId :formData.hopitalId,
        patientId :formData.patientId,
        rad_prix: this.oneHospital

      }
      console.log("Update secretaire")
      console.log(data)
    }



    this.radioService.updateRadio(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onUpdateRadio.emit();
       this.responseMessage = res.message
       this.snackbarService.openSnackbar(this.responseMessage,"success")
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

  onChange(value:any) {
   /*  this.radioForm.addControl('hop_prix',[value.hop])
    this.radioForm.controls['hopitalId'].id.setValue(value.id)
    this.radioForm.controls['hopitalId'].id.setValue(value.id) */
    this.hopitalService.getOne(value).subscribe((res:any) => {
        this.oneHospital = res.hop_prix
        console.log(res)
        console.log(this.oneHospital)
        this.radioForm.controls['rad_prix'].setValue(res.hop_prix)
    },(error)=>{
      console.log("error"+error)
    })
}

showPreview($event:any){
  const reader = new FileReader();
  reader.onload = (e:any) =>{
    this.imgSrc = e.target.result
  }
  reader.readAsDataURL($event.target.files[0]);
  this.selectedImg = $event.target.files[0];
  console.log(this.selectedImg);
}

 upload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", this.radioForm.rad_img);
  } catch (err) {
    console.log(err);
  }
};

}
