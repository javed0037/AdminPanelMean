import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../../../environments/environment';
import { CommonService } from '../../../../shared/services/common.service';

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
  // envtmnt = environment;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  toggleBlocking(data){
    data.is_blocked = (data.is_blocked == 1)? 0:1;
    this.commonService._put('admin/changeRestaurantStatus', data)
      .subscribe(response => {
        console.log(response);
        if(response && response['message']){
          this.dataSource.filteredData.forEach(elem => {
            // console.log(elem.restaurant.restaurant_id, data.restaurant_id);
            if(elem.restaurant && (elem.restaurant.restaurant_id == data.restaurant_id))
              elem.restaurant.is_blocked = data.is_blocked;
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
      if(elem._id == empId)
        this.singleData = elem;
    });
  }


  ngOnInit() {
    this.commonService._get('admin/getUserList/1')
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
