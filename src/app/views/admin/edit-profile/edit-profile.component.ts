import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators ,FormControl } from '@angular/forms';
import { DomSanitizer,SafeResourceUrl,SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  
  profileImage;
 
  // @ViewChild('profileForm') prf: FormGroup;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    lognitude: new FormControl(''),
    latitide: new FormControl(''),
    phoneNumber: new FormControl(''),
    countryCode: new FormControl(''),
    aboutMe: new FormControl('')
   
  });
  
   datapost: any;

  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    builder: FormBuilder,
    private sanitizer: DomSanitizer
  ) { }
  
  fileListUrl :[];
  fileListData:[];
  ngOnInit() {
   
  }
  onSubmit() {
   
    console.log('there are the profile form value', this.profileForm.value);
     this.datapost = this.profileForm.value;
     const formData = new FormData();
     console.log("formdata",formData)
     Object.keys(this.datapost).forEach(key => formData.append(key, this.datapost[key]));

    //  console.log("this.fileListData",this.fileListData);

      formData.controls['profileImage'].setValue(this.fileListData);

     formData.append('ProfileImage', this.profileImage);



    this.http.post('admin/updateProfile', formData)
      .subscribe((response: any) => {
        console.log("positive response ", response);
       
      },
    error => {
      console.log("negaive ",error);

    });
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



