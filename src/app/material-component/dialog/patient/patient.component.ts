import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { PatientService } from './../../../services/patient.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  onAddPatient= new EventEmitter();
  onUpdatePatient= new EventEmitter();
  patientForm:any = FormGroup;
  dialogAction : any = "Ajouter"
  action :any = "Ajouter";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,
  private patientService: PatientService,private dialogRef: MatDialogRef<PatientComponent>,private snackbarService: SnackbarService ) { }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      pat_nom :[null,[Validators.required]],
      pat_prenom :[null,[Validators.required]],
      pat_adresse :[null],
      pat_telephone :[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      pat_telephone2 :[null],
      pat_email :[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      pat_dateNaissance :[null]
    })

    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      this.patientForm.patchValue(this.dialogData.data)
    }

  }

  handlePatientSubmit(){

    if(this.dialogAction === "Modifier"){
       this.edit()
    }
    else {
      console.log("add")
      this.add()
    }

  }

  add(){
    var formData = this.patientForm.value;

    var data = {
      pat_nom : formData.pat_nom,
      pat_prenom : formData.pat_prenom,
      pat_adresse : formData.pat_adresse,
      pat_dateNaissance : formData.pat_dateNaissance,
      pat_email : formData.pat_email,
      pat_telephone : formData.pat_telephone,
      pat_telephone2 : formData.pat_telephone2,
    }

    this.patientService.addPatient(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onAddPatient.emit();
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

  edit(){

    var formData = this.patientForm.value;
    console.log(this.patientForm.value)

    var data = {
      id : this.dialogData.data.id,
      pat_nom : formData.pat_nom,
      pat_prenom : formData.pat_prenom,
      pat_adresse : formData.pat_adresse,
      pat_dateNaissance : formData.pat_dateNaissance,
      pat_email : formData.pat_email,
      pat_telephone : formData.pat_telephone,
      pat_telephone2 : formData.pat_telephone2,
    }

    this.patientService.updatePatient(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onUpdatePatient.emit();
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

}
