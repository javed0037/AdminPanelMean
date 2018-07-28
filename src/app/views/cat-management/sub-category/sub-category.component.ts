import { Component, OnInit } from '@angular/core';
import * as queryString from 'query-string';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) { }

  categoryId;

  subCategoryName; // <= For create forms
  subCategoryImage; // <= For create forms

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
      if (param.categoryId) {
        this.setDataSource(param.categoryId);
        this.categoryId = param.categoryId;
      }
    }, err => {
      console.log(err);
    })
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  setDataSource(categoryId, filter?: any) {
    let filters = filter ? filter : '';
    categoryId = categoryId == '' ? '?' : '?category_id=' + categoryId;
    let url = '/admin/get_sub_category_list' + categoryId + filters;

    this.http.post(url, {})
      .subscribe((response) => {
        this.dataSource = response['response']['sub_category_list'];
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

  createSubCategory(mainCate) {

    var uploadData = new FormData();
    uploadData.append('sub_category_name', this.subCategoryName);
    uploadData.append('category_id', this.categoryId);

    if (this.subCategoryImage) {
      uploadData.append('category_image', this.subCategoryImage, this.subCategoryImage.name);
    }

    this.http.post('/admin/add_sub_category', uploadData)
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in adding sub category.');
        } else {
          this.setDataSource(this.categoryId);
          this.commonService.toggleSnackBar('Added successfully.');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in adding sub category.');
      });

  }

  fileCatIm(file) {
    // console.log('file ', file, file.target.files[0]);
    this.subCategoryImage = file.target.files[0];
  }

  deleteSubCategory(sub_category_id) {
    this.http.post('/admin/delete_sub_category', { sub_category_id, category_id: this.categoryId })
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in deleting.');
        } else {
          this.setDataSource(this.categoryId);
          this.commonService.toggleSnackBar('Deleted successfully');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in Deleting.');
      });
  }

  editCategoryObj = {};

  editSubCategory(category_id) {
    this.editCategoryObj['category_id'] = this.categoryId;
    this.editCategoryObj['sub_category_id'] = category_id;
  }

  updateSubCategory() {
    this.editCategoryObj['sub_category_name'] = this.subCategoryName;

    console.log(' edit category => ', this.editCategoryObj);

    this.http.post('/admin/edit_sub_category', this.editCategoryObj)
      .subscribe(event => {
        if (event['error']) {
          this.commonService.toggleSnackBar('Error in updating sub category.');
        } else {
          this.setDataSource(this.categoryId);
          this.commonService.toggleSnackBar('Sub category updated successfully');
        }
      }, err => {
        console.log(' Erro => ', err);
        this.commonService.toggleSnackBar('Error in updated sub category.');
      });
  }
}
