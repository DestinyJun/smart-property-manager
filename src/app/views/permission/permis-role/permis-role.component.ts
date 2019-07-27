import { Component, OnInit } from '@angular/core';
import {
  FieldBase,
  TextArea,
  Textbox,
  Treebox
} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {PermissionService} from '../../../commons/services/permission.service';
import {SmartPublicService} from '../../../commons/services/smart-public.service';
import {TreeNode} from '../../../commons/components/api';

@Component({
  selector: 'app-permis-role',
  templateUrl: './permis-role.component.html',
  styleUrls: ['./permis-role.component.scss']
})
export class PermisRoleComponent implements OnInit {
  public roleList: any;
  public rolePage = {pageNo: '1', pageSize: '10'};
  public roleLoading = false;
  public roleThead = [
    {theadName: '唯一标识', theadLabel: 'id'},
    {theadName: '名称', theadLabel: 'roleName'},
    {theadName: '标识码', theadLabel: 'roleCode'},
    {theadName: '组织编号', theadLabel: 'organizationId'},
    {theadName: '备注', theadLabel: 'remark'},
    {theadName: '创建时间', theadLabel: 'idt'},
    {theadName: '最后修改时间', theadLabel: 'udt'},
  ];
  public roleOrgTree: any;
  public roleFields: FieldBase<any>[] = [
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
  public roleAlertsDis: any = [];
  public roleUpdateData: any;
  public roleCurrentPage: number = 1;
  constructor(
    private permissSrv: PermissionService,
    private smartPublicSrv: SmartPublicService,
  ) { }

  ngOnInit() {
    this.roleListInit(this.rolePage);
  }
  // role数据初始化
  public roleListInit(param): void {
    this.roleLoading = true;
    this.permissSrv.permisRoleSearch(param).subscribe(
      (val) => {
        this.roleLoading = false;
        this.roleList = val.data;
      }
    );
  }
  // role分页操作
  public roleChange(e): void {
    this.rolePage.pageNo = e.page;
    this.roleListInit(this.rolePage);
  }
  // role删除操作
  public roleDelete(e): void {
    this.roleLoading = true;
    this.permissSrv.permisRoleDelete({ids: e.toString()}).subscribe(
      (val) => {
        this.roleLoading = false;
        this.roleAlertsDis.push({
          type: 'success',
          msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
          timeout: 2000
        });
        this.roleListInit(this.rolePage);
      }
    );
  }
  // role新增操作
  public roleAdd(e): void {
    if (e) {
      this.roleLoading = true;
      this.permissSrv.permisRoleAdd(e).subscribe(
        (val) => {
          this.roleAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.roleLoading = false;
          this.roleListInit(this.rolePage);
        }
      );
    }
    else {
      this.smartPublicSrv.orgTreeSelect().subscribe(
        (val) => {
          this.roleOrgTree = this.treeInit(val.data);
          this.roleFields = [
            new Textbox({
              label: '角色名称',
              placeholder: '请输入角色名称',
              key: 'roleName',
              required: true,
            }),
            new Textbox({
              label: '角色编号',
              placeholder: '请输入角色编号',
              key: 'roleCode',
              required: true,
            }),
            new Treebox({
              label: '请选择所属组织',
              placeholder: '点击选择所属组织',
              type: 'text',
              key: 'name',
              required: true,
              disabled: true
            }),
            new Treebox({
              label: '组织编号ID',
              placeholder: '组织编号ID',
              type: 'text',
              key: 'organizationId',
              required: true,
              hidden: true
            }),
            new TextArea({
              value: '',
              label: '备注:',
              placeholder: '想备注的话，写在这里',
              rows: 3,
              key: 'remark',
              required: false,
            }),
          ];
        }
      );
    }
  }
  // role 修改操作
  public roleUpdate(e): void {
    if (e.saving) {
      for (const prop in e.value) {
        if (e.value.hasOwnProperty(prop) ) {
          this.roleUpdateData[prop] = e.value[prop];
        }
      }
      this.permissSrv.permisRoleUpdate(this.roleUpdateData).subscribe(
        (val) => {
          this.roleLoading = false;
          this.roleAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.roleListInit(this.rolePage);
        }
      );
    }
    else {
      this.roleUpdateData = e.value;
      if ('udt' in this.roleUpdateData) {
        delete this.roleUpdateData['udt'];
      }
      this.smartPublicSrv.orgTreeSelect().subscribe(
        (val) => {
          this.roleOrgTree = this.treeInit(val.data);
          this.roleFields = [
            new Textbox({
              value: e.value.roleName,
              label: '角色名称',
              placeholder: '请输入角色名称',
              key: 'roleName',
              required: true,
            }),
            new Textbox({
              value: e.value.roleCode,
              label: '角色编号',
              placeholder: '请输入角色编号',
              key: 'roleCode',
              required: true,
            }),
            new Treebox({
              label: '请选择所属组织',
              placeholder: '点击选择所属组织',
              type: 'text',
              key: 'name',
              required: true,
              disabled: true
            }),
            new Treebox({
              label: '组织编号ID',
              placeholder: '组织编号ID',
              type: 'text',
              key: 'organizationId',
              required: true,
              hidden: true
            }),
            new TextArea({
              value: e.value.remark,
              label: '备注:',
              placeholder: '想备注的话，写在这里',
              rows: 3,
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
      childnode.name = data[i]['organizationName'];
      childnode['organizationId'] = data[i]['organizationId'];
      if (data[i].organization2DTO) {
        childnode.children = this.treeInit(data[i].organization2DTO);
      }
      else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
}
