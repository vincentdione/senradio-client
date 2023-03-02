import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { HopitalService } from './../../../services/hopital.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';

@Component({
  selector: 'app-hopital',
  templateUrl: './hopital.component.html',
  styleUrls: ['./hopital.component.scss']
})
export class HopitalComponent implements OnInit {

  onAddHopital= new EventEmitter();
  onUpdateHopital= new EventEmitter();
  hopitalForm:any = FormGroup;
  dialogAction : any = "Ajouter"
  action :any = "Ajouter";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,
  private hopitalService:HopitalService,private dialogRef: MatDialogRef<HopitalComponent>,private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    this.hopitalForm = this.formBuilder.group({
      hop_name :[null,[Validators.required]],
      hop_adresse :[null],
      hop_numeroContact :[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      hop_prix :[null,[Validators.required]],
    })

    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      this.hopitalForm.patchValue(this.dialogData.data)
    }
  }

  handleHopitalSubmit(){

    if(this.dialogAction === "Modifier"){
       this.edit()
    }
    else {
      this.add()
    }

  }

  add(){
    var formData = this.hopitalForm.value;

    var data = {
      hop_name : formData.hop_name,
      hop_adresse : formData.hop_adresse,
      hop_numeroContact : formData.hop_numeroContact,
      hop_prix : formData.hop_prix,
    }

    this.hopitalService.addHospital(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onAddHopital.emit();
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

    var formData = this.hopitalForm.value;
    console.log(this.hopitalForm.value)

    var data = {
      id : this.dialogData.data.id,
      hop_name : formData.hop_name,
      hop_adresse : formData.hop_adresse,
      hop_numeroContact : formData.hop_numeroContact,
    }

    console.log(data)

    this.hopitalService.updateHospital(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onUpdateHopital.emit();
       this.responseMessage = res.message
       this.snackbarService.openSnackbar(this.responseMessage,"success")
    },(error:any)=>{
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
