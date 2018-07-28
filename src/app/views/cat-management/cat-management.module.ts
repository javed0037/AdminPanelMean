import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainCategoryComponent } from './main-category/main-category.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { CatManagementRoutingModule } from './cat-management-routing.module';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    CatManagementRoutingModule
  ],
  exports: [],
  declarations: [
    MainCategoryComponent,
    CategoryComponent,
    SubCategoryComponent,
  ]
})
export class CatManagementModule { }
