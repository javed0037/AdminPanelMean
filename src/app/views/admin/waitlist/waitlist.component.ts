import { Component, OnInit } from '@angular/core';
import * as queryString from 'query-string';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss']
})
export class WaitlistComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  // ================= Paginator ===============
  query;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['sno', 'name', 'email'];
  dataSource;
  // ================ /paginator ==============

  ngOnInit() {
    this.query = '';
    this.setDataSource();
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  setDataSource(filter?: any) {
    let filters = filter ? '?' + filter : '';
    // mainCategoryId = mainCategoryId == '' ? '?' : '?main_category_id=' + mainCategoryId;
    let url = '/admin/api/get_waiting_list' + filters;

    this.http.get(url, {})
      .subscribe((response) => {
        // var sno = 1;
        // response['data']['waitlist'].map((item) => {
        //   return item.sno = sno++;
        // });
        this.dataSource = response['data']['waitlist'];

        // console.log(' response[\'data\'][\'waitlist\'] => ', response['data']['waitlist']);
        // console.log(' this.dataSource => ', this.dataSource);
        
        this.length = response['data']['total_count'];
      }, err => {
        console.log(err);
      })
  }

  onPaginatorChange(pageEvent) {
    this.query = queryString.stringify(pageEvent);
    this.setDataSource(this.query);
  }

}
