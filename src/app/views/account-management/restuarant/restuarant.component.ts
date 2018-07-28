import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restuarant',
  templateUrl: './restuarant.component.html',
  styleUrls: ['./restuarant.component.scss']
})
export class RestuarantComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router ) { }
  
  query;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  // displayedColumns: string[] = ['sno', 'name', 'phone', 'email', 'action-verify','action-view-profile', 'action-block', 'action-unblock'];
  displayedColumns: string[] = ['sno', 'name', 'phone', 'email', 'action-verify', 'action-block', 'action-unblock'];
  dataSource;

  ngOnInit() {
    this.query = '';
    this.setDataSource();
  }

  setDataSource(filter?: any) {
    let filters = filter ? '?'+filter : '';
    let url = '/admin/get_restuarants_list'+ filters;
    
    this.http.get(url)
      .subscribe((response) => {
        this.dataSource = response['data'].restuarants_list;
        this.length = response['data'].total_count;
      }, err => {
        console.log(err);
      })
  }

  block(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');
    
    console.log(event.target);
    console.log('_id => ', _id);

    this.http.put('/admin/block_restuarant', {_id}).subscribe(() => {
      this.setDataSource(this.query);
    }, err => {
      console.log(err);
    })
  }

  unblock(event: MouseEvent) {
    let _id = event.srcElement.getAttribute('_id');
    this.http.put('/admin/unblock_restuarant', { _id }).subscribe(() => {
      this.setDataSource(this.query);
    }, err => {
      console.log(err);
    })
  }

  onPaginatorChange(pageEvent) {
    this.query = queryString.stringify(pageEvent);
    this.setDataSource(this.query);
  }

  verify(restId) {
    this.http.put('/admin/verify_restuarant', { restuarant_id: restId}).subscribe(response => {
      console.log(' Response => ', response);
      this.setDataSource();
    }, err => {
      console.log(' Erro => ', err);
    })
  }
  
  viewProfile(sellerId) {
    this.router.navigate(['/acc-mgm/seller-provider-profile', sellerId]);
  }
}