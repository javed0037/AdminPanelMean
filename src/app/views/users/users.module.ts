import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListingComponent } from './components/listing/listing.component';
import { MatModuleModule } from '../../mat-module.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatModuleModule
  ],
  declarations: [ListingComponent]
})
export class UsersModule { }
