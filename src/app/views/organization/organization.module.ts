import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrgAgencyComponent } from './org-agency/org-agency.component';
import { OrgDepartmentComponent } from './org-department/org-department.component';
import {TablesModule} from '../../commons/components/tables/tables.module';
import {NgxLoadingModule} from 'ngx-loading';

@NgModule({
  declarations: [
    OrgAgencyComponent,
    OrgDepartmentComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    TablesModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class OrganizationModule { }
