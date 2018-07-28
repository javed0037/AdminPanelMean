import { Component, OnInit } from '@angular/core';
import * as queryString from 'query-string';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }
  
  mainCategoryId;

  categoryName; // <= For create forms
  categoryImage; // <= For create forms

  // ================= Paginator ===============
  query;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  displayedColumns: string[] = ['name', 'image', 'action-view-cat', 'action-delete', 'action-edit'];
  dataSource;
  // ================ /paginator ==============
  
  ngOnInit() {
    this.query = '';
    this.route.params.subscribe((param) => {
      if (param.mainCategoryId) {
        this.setDataSource(param.mainCategoryId);
        this.mainCategoryId = param.mainCategoryId;
      }
    }, err => {
      console.log(err);
    })
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  setDataSource(mainCategoryId, filter?: any) {
    let filters = filter ? filter : '';
    mainCategoryId = mainCategoryId == '' ? '?' : '?main_category_id='+mainCategoryId;
    let url = '/admin/get_category_list' + mainCategoryId + filters;

    this.http.post(url, {})
      .subscribe((response) => {
        this.dataSource = response['response']['category_list'];
        this.length = response['response']['total_count'];
      }, err => {
        console.log(err);
      })
  }

  onPaginatorChange(pageEvent) {
    this.query = queryString.stringify(pageEvent);
    this.setDataSource(this.query);
  }

  viewSubCategory(categoryId) {
    this.router.navigate(['/cat-mgm/sub-category', categoryId]);
  }

  
  createCategory(mainCate) {
    
    var uploadData = new FormData();
    uploadData.append('category_name', this.categoryName);
    uploadData.append('main_category_id', this.mainCategoryId);
    
    if (this.categoryImage) {
      uploadData.append('category_image', this.categoryImage, this.categoryImage.name);
    }

    this.http.post('/admin/add_category', uploadData)
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in adding category.');
        } else {
          this.setDataSource(this.mainCategoryId);
          this.commonService.toggleSnackBar('Added successfully.');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in adding category.');
      });

  }

  fileCatIm(file) {
    // console.log('file ', file, file.target.files[0]);
    this.categoryImage = file.target.files[0];
  }

  deleteCategory(category_id) {
    this.http.post('/admin/delete_category', { category_id, main_category_id: this.mainCategoryId})
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in deleting category.');
        } else {
          this.setDataSource(this.mainCategoryId);
          this.commonService.toggleSnackBar('Main category successfully');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in deleting category.');
      });
  }

  editCategoryObj = {};

  editCategory(category_id) {
    this.editCategoryObj['main_category_id'] = this.mainCategoryId;
    this.editCategoryObj['category_id'] = category_id;
  }

  updateCategory() {
    this.editCategoryObj['category_name'] = this.categoryName;

    console.log(' edit category => ', this.editCategoryObj);
    
    this.http.post('/admin/edit_category', this.editCategoryObj)
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in updating category.');
        } else {
          this.setDataSource(this.mainCategoryId);
          this.commonService.toggleSnackBar('Category updated successfully');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in updated category.');
      });
  }
}