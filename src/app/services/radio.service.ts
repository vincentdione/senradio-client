import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  url = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addRadio(data:any){
    return this.httpClient.post(this.url+"/radios/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  generateRadio(data:any){
    return this.httpClient.post(this.url+"/radios/generate/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  updateRadio(data:any){
    console.log(data)
    console.log("update Radio")
    return this.httpClient.patch(this.url+"/radios/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteRadio(id:any){
    return this.httpClient.delete(this.url+"/radios/remove/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  getRadios(){
    return this.httpClient.get(this.url+"/radios/get/")
  }


  getRadioByHopital(id:any){
    return this.httpClient.get(this.url+"/radios/get/hopital/"+id)
  }

  getRadioByDoctorHopital(id:any,idDoc:any){
    return this.httpClient.get(this.url+`/radios/get/docteur/${id}/${idDoc}`)
  }

  getDetails(id:any){
    return this.httpClient.get(this.url+"/radios/find/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  uploadImg(img:any){
    return this.httpClient.post(this.url+"/upload/", img)
  }

  searchRadio(values:any){
    console.log("search")
    console.log(values)
    return this.httpClient.get(this.url+`/radios/search/radio?hopitalId=${values.hopitalId}&patientId=${values.patientId}&status=${values.status}`)
  }

}
