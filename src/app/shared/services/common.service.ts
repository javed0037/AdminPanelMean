import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { JwtHelper } from "angular2-jwt";
import { Subject } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(
    private http: HttpClient
  ) { }
  snackbar = new Subject<any>();

  snackbar$ = this.snackbar.asObservable();

  toggleSnackBar(message = 'Something Went Wrong'){
    this.snackbar.next(message);
  }

  _post(url, params){
    var token;
    if(localStorage.getItem('adminData')){
      var admindata = JSON.parse(localStorage.getItem('adminData'));
      token = admindata.access_token;
    }
    return this.http.post(environment.baseUrl + url, params, {
      headers: new HttpHeaders({ 'access_token': token })
    });
  }

  _get(url){
    var token;
    if(localStorage.getItem('adminData')){
      var admindata = JSON.parse(localStorage.getItem('adminData'));
      token = admindata.access_token;
    }

    return this.http.get(environment.baseUrl + url, {
      headers: new HttpHeaders({ 'access_token': token })
    });
  }

  _put(url, params){
    var token;
    if(localStorage.getItem('adminData')){
      var admindata = JSON.parse(localStorage.getItem('adminData'));
      token = admindata.access_token;
    }
    return this.http.put(environment.baseUrl + url, params, {
      headers: new HttpHeaders({ 'access_token': token })
    });
  }

  // get decodeToken(){
  //   var token = localStorage.getItem('token');    
  //   var jwthelper = new JwtHelper();
    
  //   if(token){
  //     var data = jwthelper.decodeToken(token);
  //     // console.log("jwthelper:- ",data);
  //     return data;
  //   }
  //   return null;
  // }

}
