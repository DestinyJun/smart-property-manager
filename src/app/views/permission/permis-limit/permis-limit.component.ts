import { Component, OnInit } from '@angular/core';
import {FieldBase, TextArea, Textbox, Treebox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {PermissionService} from '../../../commons/services/permission.service';
import {TreeNode} from '../../../commons/components/api';
import {Radiosbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field/radiosbox';

@Component({
  selector: 'app-permis-limit',
  templateUrl: './permis-limit.component.html',
  styleUrls: ['./permis-limit.component.scss']
})
export class PermisLimitComponent implements OnInit {
  public permisLimitList: any;
  public permisLimitTree: any;
  public permisLimitLoading = false;
  public permisLimitFields: FieldBase<any>[] = [
    /* new Textbox({
     label: '头像:',
     placeholder: '上传头像',
     type: 'file',
     key: 'upload'
   }),
   new Textbox({
     label: '用户名:',
     placeholder: '用户名',
     key: 'username'
   }),
   new Textbox({
     label: '常用邮箱:',
     placeholder: '常用邮箱',
     key: 'email'
   }),
   new Textbox({
     label: '密码:',
     type: 'password',
     placeholder: '密码，至少8位',
     key: 'password'
   }),
   new Textbox({
     label: '重复密码:',
     type: 'password',
     placeholder: '重复密码',
     key: 'fireword'
   }),
   new TextArea({
     value: '还是到付哈是否',
     label: '个人简介:',
     placeholder: '个人简介，最多140字，不能放链接。',
     rows: 3,
     key: 'intro'
   }),
   new Dropdownbox({
     value: 1,
     list: [{name: '公司1', id: 1}, {name: '公司2', id: 2}],
     label: '请选择组织:',
     key: 'origami'
   }),
   new Radiosbox({
     value: 0,
     list: [{name: '是', type: 1}, {name: '否', type: 0}],
     label: '是否是收费:',
     key: 'money'
   })*/
  ];
  public permisLimitAlertsDis: any = [];
  public permisLimitUpdateData: any = {};
  constructor(
    private permissSrv: PermissionService,
  ) { }

  ngOnInit() {
    this.permisLimitListInit();
  }
  // permisLimit初始化查询
  public permisLimitListInit(): void {
    this.permisLimitLoading = true;
    this.permissSrv.permisMangerSearch({}).subscribe(
      (val) => {
        this.permisLimitLoading = false;
        this.permisLimitList = this.treeInit(val.data);
      }
    );
  }
  // permisLimit删除操作
  public permisLimitDelete(e): void {
    this.permisLimitLoading = true;
    this.permissSrv.permisMangerDelete({permitCodes: `${e.permisCode}`}).subscribe(
      (val) => {
        this.permisLimitLoading = false;
        this.permisLimitAlertsDis.push({
          type: 'success',
          msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
          timeout: 2000
        });
        this.permisLimitListInit();
      }
    );
  }
  // permisLimit新增操作
  public permisLimitAdd(e): void {
    if (e) {
      this.permisLimitLoading = true;
      this.permissSrv.permisMangerAdd(e).subscribe(
        (val) => {
          this.permisLimitAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.permisLimitLoading = false;
          this.permisLimitListInit();
        }
      );
    }
    else {
      this.permissSrv.permisMangerSearch({}).subscribe(
        (val) => {
          this.permisLimitTree = this.treeInit(val.data);
          this.permisLimitFields = [
            new Textbox({
              label: '权限名称',
              placeholder: '请输入权限名称',
              type: 'text',
              key: 'title',
              required: true,
            }),
            new Textbox({
              label: '权限编码',
              placeholder: '请输入权限编码',
              key: 'permisCode',
              type: 'text',
              required: true,
            }),
            new Radiosbox({
              value: '1',
              list: [{name: '菜单权限', type: '1'}, {name: '功能权限', type: '2'}],
              label: '菜单类型：',
              key: 'menuPermisFlag'
            }),
            new Radiosbox({
              value: '0',
              list: [{name: '子系统', type: '0'}, {name: '一级菜单', type: '1'}, {name: '二级菜单', type: '2'}],
              label: '模块：',
              key: 'permisOrder'
            }),
            new Textbox({
              label: '路由',
              placeholder: '请输入路由',
              key: 'router',
              type: 'text',
              required: true,
            }),
            new Textbox({
              label: '颜色',
              placeholder: '请输入颜色',
              key: 'color',
              type: 'text',
              required: true,
            }),
            new Treebox({
              label: '权限级别',
              placeholder: '点击选择权限级别',
              type: 'text',
              key: 'name',
              required: true,
              disabled: true
            }),
            new Treebox({
              label: '权限级别',
              placeholder: '权限级别',
              type: 'text',
              key: 'parentCode',
              parent: 'permisCode',
              required: false,
              hidden: true
            }),
            new TextArea({
              value: '',
              label: '备注',
              placeholder: '想备注的话就写在这里',
              row: 5,
              key: 'remark',
              required: false,
            }),
          ];
        }
      );
    }
  }
  // permisLimit 修改操作
  public permisLimitUpdate(e): void {
    if (e.saving) {
      this.permisLimitLoading = true;
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          if (item in this.permisLimitUpdateData) {
            this.permisLimitUpdateData[item] = e.value[item];
          }
        }
      }
      this.permissSrv.permisMangerUpdate(this.permisLimitUpdateData).subscribe(
        (val) => {
          this.permisLimitLoading = false;
          if (val.status !== '1000') {
            this.permisLimitAlertsDis.push({
              type: 'danger',
              msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
              timeout: 3000
            });
            return;
          }
          this.permisLimitAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.permisLimitListInit();
        }
      );
    }
    else {
      const ignore = ['udt', 'children'];
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          this.permisLimitUpdateData[item] = e.value[item];
        }
      }
      for (let i = 0; i < ignore.length ; i++) {
        if (ignore[i] in this.permisLimitUpdateData) {
          delete this.permisLimitUpdateData[ignore[i]];
        }
      }
      if (this.permisLimitUpdateData.hasOwnProperty('name')) {
        this.permisLimitUpdateData['title'] =  this.permisLimitUpdateData.name;
        delete this.permisLimitUpdateData.name;
      }
      this.permissSrv.permisMangerSearch({}).subscribe(
        (val) => {
          this.permisLimitTree = this.treeInit(val.data);
          this.permisLimitFields = [
            new Textbox({
              label: '权限名称',
              value: this.permisLimitUpdateData.title,
              placeholder: '请输入权限名称',
              type: 'text',
              key: 'title',
              required: true,
            }),
            new Textbox({
              label: '权限编码',
              value: e.value.permisCode,
              placeholder: '请输入权限编码',
              key: 'permisCode',
              type: 'text',
              required: true,
            }),
            new Radiosbox({
              value: `${e.value.menuPermisFlag}`,
              list: [{name: '菜单权限', type: '1'}, {name: '功能权限', type: '2'}],
              label: '菜单类型：',
              key: 'menuPermisFlag'
            }),
            new Radiosbox({
              value: `${e.value.permisOrder}`,
              list: [{name: '子系统', type: '0'}, {name: '一级菜单', type: '1'}, {name: '二级菜单', type: '2'}],
              label: '模块：',
              key: 'permisOrder'
            }),
            new Textbox({
              label: '路由',
              value: e.value.router,
              placeholder: '请输入路由',
              key: 'router',
              type: 'text',
              required: true,
            }),
            new Textbox({
              label: '颜色',
              value: e.value.color,
              placeholder: '请输入颜色',
              key: 'color',
              type: 'text',
              required: true,
            }),
            new Treebox({
              label: '权限级别',
              placeholder: '点击选择权限级别',
              type: 'text',
              key: 'name',
              required: true,
              disabled: true
            }),
            new Treebox({
              label: '权限级别',
              placeholder: '权限级别',
              type: 'text',
              key: 'parentCode',
              parent: 'id',
              required: false,
              hidden: true
            }),
            new TextArea({
              value: e.value.remark,
              label: '备注',
              placeholder: '想备注的话就写在这里',
              row: 5,
              key: 'remark',
              required: false,
            }),
          ];
        }
      );
    }
  }
  // tree 数据初始化
  public treeInit(data): any {
    const oneChild: TreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      const childnode: TreeNode = {};
      childnode.id = data[i]['id'];
      childnode.name = data[i]['title'];
      childnode['permisCode'] = data[i]['permisCode'];
      childnode['menuPermisFlag'] = data[i]['menuPermisFlag'];
      childnode['permisOrder'] = data[i]['permisOrder'];
      childnode['router'] = data[i]['router'];
      childnode['color'] = data[i]['color'];
      childnode['parentCode'] = data[i]['parentCode'];
      childnode['remark'] = data[i]['remark'];
      if (data[i].permitDTO) {
        childnode.children = this.treeInit(data[i].permitDTO);
      }
      else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
}
