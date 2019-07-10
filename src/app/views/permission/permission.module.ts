import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermisUserComponent } from './permis-user/permis-user.component';
import { PermisLimitComponent } from './permis-limit/permis-limit.component';
import { PermisRoleComponent } from './permis-role/permis-role.component';
import { PermisUsermComponent } from './permis-userm/permis-userm.component';
import { PermisRolemComponent } from './permis-rolem/permis-rolem.component';

@NgModule({
  declarations: [PermisUserComponent, PermisLimitComponent, PermisRoleComponent, PermisUsermComponent, PermisRolemComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule
  ]
})
export class PermissionModule { }
