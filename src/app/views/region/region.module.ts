import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionRoutingModule } from './region-routing.module';
import { RegionProvinceComponent } from './region-province/region-province.component';
import { RegionCityComponent } from './region-city/region-city.component';
import { RegionCountyComponent } from './region-county/region-county.component';
import { RegionCommunityComponent } from './region-community/region-community.component';
import {TablesModule} from '../../commons/components/tables/tables.module';
import {NgxLoadingModule} from 'ngx-loading';
import {SmartAlertModule} from '../../commons/components/smart-alert/smart-alert.module';

@NgModule({
  declarations: [RegionProvinceComponent, RegionCityComponent, RegionCountyComponent, RegionCommunityComponent],
  imports: [
    CommonModule,
    RegionRoutingModule,
    TablesModule,
    NgxLoadingModule.forRoot({}),
    SmartAlertModule
  ]
})
export class RegionModule { }
