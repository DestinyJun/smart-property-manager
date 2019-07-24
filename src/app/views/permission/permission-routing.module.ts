import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermisUserComponent} from './permis-user/permis-user.component';
import {PermisLimitComponent} from './permis-limit/permis-limit.component';
import {PermisRoleComponent} from './permis-role/permis-role.component';
import {PermisUsermComponent} from './permis-userm/permis-userm.component';
import {PermisRolemComponent} from './permis-rolem/permis-rolem.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '权限管理'
    },
    children: [
      {
        path: '',
        redirectTo: 'user',
      },
      {
        path: 'user',
        component: PermisUserComponent,
        data: {
          title: '用户管理'
        }
      },
      {
        path: 'limit',
        component: PermisLimitComponent,
        data: {
          title: '权限管理'
        }
      },
      {
        path: 'role',
        component: PermisRoleComponent,
        data: {
          title: '角色管理'
        }
      },
      {
        path: 'userm',
        component: PermisUsermComponent,
        data: {
          title: '用户角色配置'
        }
      },
      {
        path: 'rolem',
        component: PermisRolemComponent,
        data: {
          title: '角色权限配置'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
