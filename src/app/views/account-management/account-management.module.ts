import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountManagementRoutingModule } from './account-management-routing.module';
import { AccMainComponent } from './acc-main/acc-main.component';
import { RestuarantComponent } from './restuarant/restuarant.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { ProductListComponent, DialogOverviewExampleDialog } from './product-list/product-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellerProviderProfileComponent } from './seller-provider-profile/seller-provider-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountManagementRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
    
  ],
  exports: [DialogOverviewExampleDialog],
  declarations: [
    DialogOverviewExampleDialog, 
    AccMainComponent, 
    RestuarantComponent, 
    UserListComponent, 
    ProviderListComponent, 
    ProductListComponent,
    UserProfileComponent,
    SellerProviderProfileComponent
  ]
})
export class AccountManagementModule { }
