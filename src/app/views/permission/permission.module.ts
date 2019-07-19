import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermisUserComponent } from './permis-user/permis-user.component';
import { PermisLimitComponent } from './permis-limit/permis-limit.component';
import { PermisRoleComponent } from './permis-role/permis-role.component';
import { PermisUsermComponent } from './permis-userm/permis-userm.component';
import { PermisRolemComponent } from './permis-rolem/permis-rolem.component';
import {TablesModule} from '../../commons/components/tables/tables.module';
import {NgxLoadingModule} from 'ngx-loading';
import {SmartAlertModule} from '../../commons/components/smart-alert/smart-alert.module';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    PermisUserComponent,
    PermisLimitComponent,
    PermisRoleComponent,
    PermisUsermComponent,
    PermisRolemComponent
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    TablesModule,
    NgxLoadingModule.forRoot({}),
    SmartAlertModule,
    PaginationModule.forRoot(),
    FormsModule
  ]
})
export class PermissionModule { }
