import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonService } from '../../../../shared/services/common.service';
// import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
}) 
export class ListingComponent implements OnInit {

  constructor(
    private commonService: CommonService,
    private http: HttpClient
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'email', 'mobile', 'action'];

  dataSource;
  singleData = {
    profileImage: '',
    isVerified: '',
    firstName: '',
    lastName: '',
    mobile: '',
    address: [],
    createdOn: '',
    email: '',
    isBlocked: ''
  };
  envtmnt = environment;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  toggleBlocking(data){
    var putData = {
      is_blocked: 0,
      user_id: data.user_id
    }
    putData.is_blocked =  (data.isBlocked == 1) ? 0 : 1;

    this.commonService._put('admin/changeUserStatus', putData)
      .subscribe(response => {
        if(response && response['message']){
          this.dataSource.filteredData.forEach(elem => {
            if(elem.user_id == data.user_id)
              elem.is_blocked = putData.is_blocked;
          });
          this.commonService.toggleSnackBar(response['message']);
        }
        else this.commonService.toggleSnackBar('Something went wrong');
      }, error => {
        this.commonService.toggleSnackBar('Something went wrong');
      });
  }

  getSingleUserData(empId){
    this.dataSource.filteredData.forEach(elem => {
      if(elem.user_id == empId){
        this.singleData = elem;
        console.log(elem);
      }
    });
  }


  ngOnInit() {
    console.log(environment.baseUrl);
    this.commonService._get('admin/getUserList/0')
      .subscribe((response: any) => {
        console.log('userList ', response)
        this.dataSource  =  new MatTableDataSource(response.response);
        this.dataSource['paginator'] = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        this.commonService.toggleSnackBar('Something went wrong');
      })
  }

}
