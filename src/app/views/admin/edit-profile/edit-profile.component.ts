import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators ,FormControl } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl,SafeUrl} from '@angular/platform-browser';
import { Routes, Router, ActivatedRoute } from '@angular/router';
// import { Routes, Router } from '@angular/router';
import { AuthService } from '../../.././shared/services/auth.service';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  
  profileImage;
 
  // @ViewChild('profileForm') prf: FormGroup;

  adminData: any;
   datapost: any;
   profileForm:FormGroup;

   initiateForm(){
    this.profileForm = this.fb.group({
      firstName : this.adminData.firstName,
      email: this.adminData.email,
      phoneNumber: this.adminData.phoneNumber,
      aboutMe: this.adminData.aboutMe,
      location : this.adminData.location,
      adminId : this.adminData._id
  
    });

   }


  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    public fb: FormBuilder,
    builder: FormBuilder,
    private sanitizer: DomSanitizer,
    public router: Router,
    private route: ActivatedRoute,
    private _auth: AuthService
  ) { 


  }
  
  fileListUrl;
  fileListData;
  ngOnInit() {
    
    let user = this._auth.getLoginUser();
    
    this.http.post('likeMinded/getAdminProfile', {adminId: user._id})
    .subscribe(response => {
      // let element = response.data;
     // console.log(element)
      if(response) {
        this.adminData = response['data'];
        console.log("jjjjjjjjjjjjjj",this.adminData)

        this.initiateForm();     
        // this.profileForm.setValue({
        // email: 'sdfds', 
        // phoneNumber: 'sdfsd',
        // firstName : 'dfdfdgfv',
        // aboutMe : 'dffdf',

        // });
        
       // this.email = this.adminData.email;
        // this.manageCharts();
      } else {
        this.commonService.toggleSnackBar();
      }
    }, error =>  {
      console.log(' Error => ', error);
      this.commonService.toggleSnackBar()
    })
  }
  // ngOnInit() {
   
  // }
  onSubmit() {
       
    console.log('there are the profile form value', this.profileForm.value);
     this.datapost = this.profileForm.value;
     const formData = new FormData();
     console.log("formdata",formData)
     Object.keys(this.datapost).forEach(key => formData.append(key, this.datapost[key]));
     

      console.log("this.fileListData@@@@@#################",formData);

      // formData.controls['profileImage'].setValue(this.fileListData);

     formData.append('ProfileImage', this.profileImage);

    this.http.post('admin/updateProfile', formData)
      .subscribe((response: any) => {
     if(response.data) {
        localStorage.removeItem('adminData');
        // this.createToken(response.data);
        console.log('response.data$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',response.data);
        localStorage.setItem('adminData', JSON.stringify(response.data));
      
        window.location.reload();
        this.router.navigate(['']);
     }else {
      // this.errorMessage = 'Something  went wrong';
     }
       
      },
    error => {
      console.log("negaive ",error);

    });

  }

  createToken(adminData){ 
    delete adminData.data.password;
    localStorage.setItem('adminData.data', JSON.stringify(adminData.data));
      //  window.location.reload();
      //  this.router.navigate(['']);
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl || '/dashboard']);
    this.commonService.toggleSnackBar(adminData.message);
  }
  imageupload(e)
  {
    
  }
  filee(file){
    // console.log('file ', file, file.target.files[0]);
     this.profileImage = file.target.files[0];
     console.log(this.profileImage);
    //  let that = this;
    //  if (file.target.files && file.target.files[0]) {
    //      var reader = new FileReader();
         
    //      reader.onload = function (e:any) {
    //        console.log(e.target.result);
    //        that.profileImage = e.target.result;
    //          // $('#profile-img-tag').attr('src', e.target.result);
    //      }
    //      reader.readAsDataURL(file.target.files[0]);
    //  }
     
     console.log(this.profileImage);
   }

  }



