import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionRoutingModule } from './region-routing.module';
import { RegionProvinceComponent } from './region-province/region-province.component';
import {TablesModule} from '../../commons/components/tables/tables.module';
import {NgxLoadingModule} from 'ngx-loading';
import {SmartAlertModule} from '../../commons/components/smart-alert/smart-alert.module';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RegionProvinceComponent
  ],
  imports: [
    CommonModule,
    RegionRoutingModule,
    TablesModule,
    NgxLoadingModule.forRoot({}),
    SmartAlertModule,
    PaginationModule.forRoot(),
    FormsModule
  ]
})
export class RegionModule { }
