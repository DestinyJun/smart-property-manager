import { Component, OnInit } from '@angular/core';
import {Dropdownbox, FieldBase, Textbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {PermissionService} from '../../../commons/services/permission.service';

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
  public roleFields: FieldBase<any>[] = [];
  public roleAlertsDis: any = [];
  public roleUpdateData: any;
  public roleCurrentPage: number = 1;
  constructor(
    private permissSrv: PermissionService,
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
    const arr = [];
    e.map((val) => {
      arr.push({id: val});
    });
    this.roleLoading = true;
    this.permissSrv.permisRoleDelete({data: arr}).subscribe(
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
    const i = e.provinceName;
    if (e) {
      this.roleLoading = true;
      this.permissSrv.permisRoleAdd({
        roleName: e.roleName,
        roleCode: e.roleCode,
      }).subscribe(
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
    } else {
      this.roleFields = [
        new Textbox({
          label: '市名称',
          placeholder: '请输入市名称',
          key: 'roleName',
          required: true,
        }),
        new Textbox({
          label: '市编号',
          placeholder: '请输入市编号',
          key: 'roleCode',
          required: true,
        }),
        new Dropdownbox({
          list: '',
          label: '请选择所属省:',
          placeholder: '下拉选择省份...',
          key: 'provinceName',
          optionName: 'provinceName',
          required: true,
        })
      ];
    }
  }
  // role 修改操作
  public roleUpdate(e): void {
    if (e.saving) {
      let i = null;
      const obj = this.roleUpdateData;
      for (const prop in obj) {
        if (e.value.hasOwnProperty(prop) ) {
          this.roleUpdateData[prop] = e.value[prop];
        }
      }
      if (!(isNaN(e.value.provinceName)) || !(e.value.provinceName === 'null')) {
        i = e.value.provinceName;
        // this.roleUpdateData.provinceName = this.provinceList[i].provinceName;
        // this.roleUpdateData.provinceCode = this.provinceList[i].provinceCode;
      }
      this.roleLoading = true;
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
      if (this.roleUpdateData.hasOwnProperty('udt')) {
        delete this.roleUpdateData.udt;
      }
      this.roleFields = [
        new Textbox({
          value: `${e.value.roleName}`,
          label: '市名称',
          placeholder: '请输入市名称',
          key: 'roleName',
          required: true,
        }),
        new Textbox({
          value: `${e.value.roleCode}`,
          label: '市编号',
          placeholder: '请输入市编号',
          key: 'roleCode',
          required: true,
        }),
        new Dropdownbox({
          value: ``,
          placeholder: '下拉选择省份...',
          label: '请选择所属省:',
          key: 'provinceName',
          optionName: 'provinceName'
        }),
      ];
    }
  }
}
