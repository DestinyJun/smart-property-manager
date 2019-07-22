import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionProvinceComponent} from './region-province/region-province.component';
import {RegionCityComponent} from './region-city/region-city.component';
import {RegionCountyComponent} from './region-county/region-county.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '区划管理'
    },
    component: RegionProvinceComponent
    /*children: [
      {
        path: '',
        redirectTo: 'province',
      },
      {
        path: 'province',
        component: RegionProvinceComponent,
        data: {
          title: '省管理'
        }
      },
      {
        path: 'city',
        component: RegionCityComponent,
        data: {
          title: '市管理'
        }
      },
      {
        path: 'county',
        component: RegionCountyComponent,
        data: {
          title: '县区管理'
        }
      },
      {
        path: 'community',
        component: RegionCommunityComponent,
        data: {
          title: '小区'
        }
      },
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule { }
