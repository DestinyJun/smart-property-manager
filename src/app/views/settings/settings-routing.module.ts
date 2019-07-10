import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingFieldComponent} from './setting-field/setting-field.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '系统设置'
    },
    children: [
      {
        path: '',
        redirectTo: 'field',
      },
      {
        path: 'field',
        component: SettingFieldComponent,
        data: {
          title: '基础字段配置'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
