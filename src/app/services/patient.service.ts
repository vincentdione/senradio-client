import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addPatient(data:any){
    return this.httpClient.post(this.url+"/patients/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updatePatient(data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/patients/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deletePatient(id:any){
    return this.httpClient.delete(this.url+"/patients/remove/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getPatients(){
    return this.httpClient.get(this.url+"/patients/get/")
  }

  getPatientByHopital(id:any){
    return this.httpClient.get(this.url+"/patients/get/hopital/"+id)
  }

}
