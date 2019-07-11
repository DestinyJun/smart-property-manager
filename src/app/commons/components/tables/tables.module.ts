import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesPopularComponent } from './tables-popular/tables-popular.component';
import {ModalModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlComponent} from './tables-popular/dynamic-form/form-control.component';

@NgModule({
  declarations: [
    TablesPopularComponent,
    FormControlComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  exports: [
    TablesPopularComponent
  ]
})
export class TablesModule { }
