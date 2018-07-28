import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCategoryComponent } from './main-category/main-category.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainCategoryComponent
      },
      {
        path: 'category/:mainCategoryId',
        component: CategoryComponent
      },
      {
        path: 'sub-category/:categoryId',
        component: SubCategoryComponent
      }
      
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatManagementRoutingModule { }
