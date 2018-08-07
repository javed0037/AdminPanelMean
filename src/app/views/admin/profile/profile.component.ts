import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private router: Router
    // private location: Location
  ) { }
  
  adminId;
  adminData;
  newpass;
  errMessage = '';
  environment = environment;

  matchPassword(pass){
    if(this.newpass !== pass)
      this.errMessage = 'Password does not match';
    else this.errMessage = '';
    return true;
  }

  changePassword(data){
    const adminData = localStorage.getItem('adminData');
    const adminData2 = JSON.parse(adminData);
    console.log('****there are data****',data);

    var putData = {
      adminId: adminData2._id,
      newPassword: data.newPass,
      oldPassword: data.oldPass,
      confirmNewPassword: data.rePass
    }
    this.http.post('likeMinded/changePassword', putData)
      .subscribe(response => {
        if(response) {
          // this.commonService.toggleSnackBar(this.errMessage = response['response']);
          localStorage.setItem('access_token', '');
          localStorage.setItem('adminData', '');
          localStorage.setItem('token', '');
          localStorage.setItem('user', '');
          console.log('navigate to /');
          console.log('and response is / ', response);
          
          // this.commonService.toggleSnackBar('');
          // setTimeout(() => {
          //   this.router.navigate(['/'], { replaceUrl: true });
          // });
          window.location.replace('/');
          // this.location.replaceState('/');
        }
        else this.errMessage = "Something Went wrong";          
      }, error => {
        
        if (error && error.error && error.error.error ) {
          // console.log('1 => ', error.error.error);
          this.errMessage = error.error.error;
          // this.commonService.toggleSnackBar(error.error.error);
        } else {
          this.errMessage = 'Something Went wrong';
          // this.commonService.toggleSnackBar('Something Went wrong');
        }
      })
  }

  ngOnInit() {
    if(localStorage.getItem('adminData'))
      this.adminData = JSON.parse(localStorage.getItem('adminData'));
    // else
      // this.commonService.toggleSnackBar();
  }

}
