import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartAlertComponent } from './smart-alert.component';
import {AlertModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [SmartAlertComponent],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
  ],
  exports: [SmartAlertComponent]
})
export class SmartAlertModule { }
