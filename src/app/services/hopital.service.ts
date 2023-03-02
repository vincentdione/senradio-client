import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {

  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addHospital(data:any){
    console.log("hopital"+JSON.stringify(data));
    return this.httpClient.post(this.url+"/hopital/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateHospital(data:any){
    console.log(data)
    console.log("update Hospital")
    return this.httpClient.patch(this.url+"/hopital/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteHospital(id:any){
    return this.httpClient.delete(this.url+"/hopital/remove/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getHospitals(){
    return this.httpClient.get(this.url+"/hopital/get/")
  }

  getOne(id:any){
    return this.httpClient.get(this.url+"/hopital/find/"+id)
  }

}
