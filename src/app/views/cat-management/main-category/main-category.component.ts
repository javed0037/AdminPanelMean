import { Component, OnInit } from '@angular/core';
import * as queryString from 'query-string';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private commonService: CommonService) { }
  
  mainCategoryName; // <= For create forms
  mainCategoryImage; // <= For create forms

  query;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['name', 'image', 'action-view-cat', 'action-delete', 'action-edit'];
  dataSource;

  ngOnInit() {
    this.query = '';
    this.setDataSource();
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  setDataSource(filter?: any) {
    let filters = filter ? '?' + filter : '';
    let url = '/admin/get_main_category_list' + filters;

    this.http.post(url, {})
      .subscribe((response) => {
        this.dataSource = response['response']['main_category_list'];
        this.length = response['response']['total_count'];
      }, err => {
        console.log(err);
      })
  }

  onPaginatorChange(pageEvent) {
    this.query = queryString.stringify(pageEvent);
    this.setDataSource(this.query);
  }

  viewCategory(mainCategoryId) {
    this.router.navigate(['/cat-mgm/category', mainCategoryId]);
  }
  
  createMainCategory(mainCate) {
    var uploadData = new FormData();
    
    uploadData.append('main_category_name', this.mainCategoryName);
    if (this.mainCategoryImage) {
      uploadData.append('main_category_image', this.mainCategoryImage, this.mainCategoryImage.name);
    }

    this.http.post('/admin/add_main_category', uploadData)
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in adding category.');
        } else {
          this.setDataSource();
          this.commonService.toggleSnackBar('Added successfully.');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in adding category.');
      });

  }

  fileMainCatIm(file) {
    // console.log('file ', file, file.target.files[0]);
    this.mainCategoryImage = file.target.files[0];
  }

  deleteMainCategory(main_category_id) {
    this.http.post('/admin/delete_main_category', { main_category_id})
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in deleting main category.');
        } else {
          this.setDataSource();
          this.commonService.toggleSnackBar('Main category deleted successfully');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in deleting main category.');
      });
  }

  editMainCategoryObj = {};
  editMainCategory(main_category_id) {
    this.editMainCategoryObj['main_category_id'] = main_category_id;
    

  }

  updateMainCategory() {
    this.editMainCategoryObj['main_category_name'] = this.mainCategoryName;
    this.http.post('/admin/edit_main_category', this.editMainCategoryObj)
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in updating main category.');
        } else {
          this.setDataSource();
          this.commonService.toggleSnackBar('Main category updated successfully');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in updated main category.');
      });

  }

}
