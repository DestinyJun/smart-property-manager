import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrgAgencyComponent } from './org-agency/org-agency.component';
import { OrgDepartmentComponent } from './org-department/org-department.component';
import {TablesModule} from '../../commons/components/tables/tables.module';
import {NgxLoadingModule} from 'ngx-loading';
import {SmartAlertModule} from '../../commons/components/smart-alert/smart-alert.module';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    OrgAgencyComponent,
    OrgDepartmentComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    TablesModule,
    NgxLoadingModule.forRoot({}),
    SmartAlertModule,
    PaginationModule.forRoot(),
    FormsModule
  ]
})
export class OrganizationModule { }
