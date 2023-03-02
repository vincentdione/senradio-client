import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  onAddUser= new EventEmitter();
  onUpdateUser= new EventEmitter();
  userForm:any = FormGroup;
  dialogAction : any = "Ajouter"
  action :any = "Ajouter";
  responseMessage:any;
  roles : any [] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder : FormBuilder,
  private userService:UserService,private dialogRef: MatDialogRef<UserComponent>,private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      nom :[null,[Validators.required]],
      prenom :[null,[Validators.required]],
      username :[null,[Validators.required]],
      adresse :[null],
      telephone :[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      telephone2 :[null],
      email :[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password :[null,[Validators.required]],
      dateNaissance :[null],
      role :[null],
    })

    if(this.dialogData.action === "Modifier"){
      this.dialogAction = "Modifier"
      this.action = "Modifier"
      this.userForm.patchValue(this.dialogData.data)
    }
    this.getRoles()
  }


  getRoles(){
    this.userService.getRoles().subscribe((res:any)=>{
      this.roles = res
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


  handleUserSubmit(){

    if(this.dialogAction === "Modifier"){
       this.edit()
    }
    else {
      console.log("add")
      this.add()
    }

  }

  add(){
    var formData = this.userForm.value;

    var data = {
      nom :formData.nom,
      prenom :formData.prenom,
      username :formData.username,
      adresse :formData.adresse,
      telephone :formData.telephone,
      telephone2 :formData.telephone2,
      email :formData.email,
      password :formData.password,
      dateNaissance :formData.dateNaissance,
      role : formData.role,
    }

    this.userService.addUser(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onAddUser.emit();
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

    var formData = this.userForm.value;
    console.log(" edit form data")
    console.log(formData)
    console.log(" edit form data")

    var data = {
      id : this.dialogData.data.id,
      nom :formData.nom,
      prenom :formData.prenom,
      username :formData.username,
      adresse :formData.adresse,
      telephone :formData.telephone,
      telephone2 :formData.telephone2,
      email :formData.email,
      password :formData.password,
      dateNaissance :formData.dateNaissance,
      role : formData.role,
    }

    console.log("Update user")
    console.log(data)


    this.userService.updateUser(data).subscribe((res:any)=>{
       this.dialogRef.close()
       this.onUpdateUser.emit();
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
