import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../../environments/environment";
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  environment = environment;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  forgotPass = 0; // 1= enter email 2= change pass
  errorMessage = '';
  resetToken;
  buttonLoading  = false;

  login(data){
    // console.log(data);
    this.errorMessage = '';

    console.log(' Login Datfgdgfgdugfuudgfudbf fhdfdga -> ', data);

    this.http.post('admin/adminLogin', data)
      .subscribe((response: any) => {

        
        if(response.data && response.token) {
          this.createToken(response.token, response.data);
        } else {
          this.errorMessage = 'Something  went wrong';
        }
      },
    error => {
      if(error && error.error['message']) this.errorMessage = error.error['message'];
      
      else this.errorMessage = 'Something went wrong';
    });
  }

  createToken(token, adminData){
    localStorage.setItem('token', token);
    delete adminData.password;
    localStorage.setItem('adminData', JSON.stringify(adminData));
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl || '/dashboard']);
    this.commonService.toggleSnackBar('Logged in Successfully');
  }

  forgotPassEmail;
  forgotPassword(data){
    this.buttonLoading = true;

    this.http.post('/admin/forgotPassword', data)
      .subscribe((response: any) => {
        console.log('response ', response);
        this.forgotPassEmail = data.email;
        this.buttonLoading = false;
        if(response && response['message'] ) this.errorMessage = response['message'];
        this.forgotPass = 2;
      },
    error => {
        this.buttonLoading = false;
        console.log('error ', error);
    });
  }

  resetPass(value){
    if(value.password !== value.Cpassword)
      this.errorMessage = 'Confirm Password does not match';
    else{
      value.token = this.resetToken;
      value.email = this.forgotPassEmail;

      console.log(' Value => ', value);

      this.http.post( '/admin/resetPass', value)
        .subscribe((response: any) => {
          console.log('response resetPass ', response);
          this.forgotPass = 0;
          if(response && response['message'] ) this.errorMessage = response['message'];
        },
      error => {
        console.log('error ', error);
      });
    }
  }

  ngOnInit() {
    if(localStorage.getItem('token'))
      this.router.navigate(['/dashboard']);
    else{
      this.route.paramMap
      .subscribe(response => {
        var token = response.get('token');
        console.log('url token ', token);
        if(token){
          this.resetToken = token;
          this.forgotPass = 2;
        }
      })
    }
  }

}
