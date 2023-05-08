import { environment } from './../../environments/environment';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  signup(data:any){

    return this.httpClient.post(this.url+"/auth/register", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })

  }

  forgotPassword(data:any){

    return this.httpClient.post(this.url+"/auth/forgotPassword", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })

  }

  login(data:any){
    return this.httpClient.post(this.url+"/auth/login", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })

  }




  updateUser(data:any){
    console.log(data)
    return this.httpClient.patch(this.url+"/users/update/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  addUser(data:any){
    console.log(data)
    return this.httpClient.post(this.url+"/users/add/", data,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }

  deleteUser(id:any){
    return this.httpClient.delete(this.url+"/users/remove/"+id,{
      headers: new HttpHeaders().set( 'Content-Type','application/json')
    })
  }



  checkToken(){
    console.log("first")
    return this.httpClient.get(this.url+"/auth/checkToken");
  }

  changePassword(data:any){
    return this.httpClient.post(this.url+"/auth/changePassword", data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  changeStatusIsactive(id:any){
    return this.httpClient.patch(this.url+"/users/isactive/"+id,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  changeStatusIsDeactive(id:any){
    return this.httpClient.patch(this.url+"/users/isnotactive/"+id,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getUsers(){
    return this.httpClient.get(this.url+"/users/get/")
  }

  getUsersByHopital(id:any){
    return this.httpClient.get(this.url+"/users/get/"+id)
  }

  getUsersByRole(id:any){
    return this.httpClient.get(this.url+"/users/get/roles/"+id)
  }

  getOne(id:any){
    console.log(id)
    return this.httpClient.get(this.url+"/users/find/"+id)
  }

  getOneRole(id:any){
    return this.httpClient.get(this.url+"/users/find/role/"+id)
  }


  getRoles(){
    return this.httpClient.get(this.url+"/users/roles/")
  }

  goToDashboard(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get(this.url+"/auth/checkToken",{headers:headers})
   }



}
