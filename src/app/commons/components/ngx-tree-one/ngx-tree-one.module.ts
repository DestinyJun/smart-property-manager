import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreePopularComponent } from './tree-popular/tree-popular.component';

@NgModule({
  declarations: [TreePopularComponent],
  imports: [
    CommonModule
  ],
  exports: [TreePopularComponent]
})
export class NgxTreeOneModule { }
