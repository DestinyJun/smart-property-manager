import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionProvinceComponent} from './region-province/region-province.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '区划管理'
    },
    component: RegionProvinceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule { }
