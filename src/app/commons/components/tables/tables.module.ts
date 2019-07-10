import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesPopularComponent } from './tables-popular/tables-popular.component';
import {PagingModule} from '../paging/paging.module';

@NgModule({
  declarations: [TablesPopularComponent],
  imports: [
    CommonModule,
    PagingModule
  ],
  exports: [
    TablesPopularComponent
  ]
})
export class TablesModule { }
