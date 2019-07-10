import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingFieldComponent } from './setting-field/setting-field.component';
import {TablesModule} from '../../commons/components/tables/tables.module';
import {PagingModule} from '../../commons/components/paging/paging.module';

@NgModule({
  declarations: [SettingFieldComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TablesModule,
  ]
})
export class SettingsModule { }
