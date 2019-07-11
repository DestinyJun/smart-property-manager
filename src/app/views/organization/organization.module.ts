import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrgAgencyComponent } from './org-agency/org-agency.component';
import { OrgDepartmentComponent } from './org-department/org-department.component';
import {TablesModule} from '../../commons/components/tables/tables.module';

@NgModule({
  declarations: [OrgAgencyComponent, OrgDepartmentComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    TablesModule,
  ]
})
export class OrganizationModule { }
