import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrgAgencyComponent} from './org-agency/org-agency.component';
import {OrgDepartmentComponent} from './org-department/org-department.component';

const routes: Routes = [
  {
    path: '',
    data: {title: '组织管理'},
    children: [
      {path: '', redirectTo: 'agency'},
      {path: 'agency', component: OrgAgencyComponent, data: {title: '机构管理'}},
      {path: 'department', component: OrgDepartmentComponent, data: {title: '部门管理'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
