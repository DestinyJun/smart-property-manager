import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesPopularComponent } from './tables-popular/tables-popular.component';
import {ModalModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlComponent} from './tables-popular/dynamic-form/form-control.component';
import {SmartAlertModule} from '../smart-alert/smart-alert.module';

@NgModule({
  declarations: [
    TablesPopularComponent,
    FormControlComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SmartAlertModule
  ],
  exports: [
    TablesPopularComponent
  ]
})
export class TablesModule { }
