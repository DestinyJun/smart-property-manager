import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrgAgencyComponent } from './org-agency/org-agency.component';
import { OrgDepartmentComponent } from './org-department/org-department.component';

@NgModule({
  declarations: [OrgAgencyComponent, OrgDepartmentComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule
  ]
})
export class OrganizationModule { }
