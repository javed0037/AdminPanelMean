import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { ListingComponent } from './components/listing/listing.component';
import { MatModuleModule } from 'src/app/mat-module.module';

@NgModule({
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    MatModuleModule
  ],
  declarations: [ListingComponent]
})
export class RestaurantsModule { }
