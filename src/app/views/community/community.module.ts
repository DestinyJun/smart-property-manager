import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import {CommunityComponent} from './community.component';
import {TablesModule} from '../../commons/components/tables/tables.module';
import {NgxLoadingModule} from 'ngx-loading';
import {SmartAlertModule} from '../../commons/components/smart-alert/smart-alert.module';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [CommunityComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    TablesModule,
    NgxLoadingModule.forRoot({}),
    SmartAlertModule,
    PaginationModule.forRoot(),
    FormsModule
  ]
})
export class CommunityModule { }
