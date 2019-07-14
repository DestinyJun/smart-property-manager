import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '../../../commons/services/organization.service';
import {FieldBase, TextArea, Textbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {Dropdownbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field/dropdownbox';
import {Radiosbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field/radiosbox';
import {SmartPublicService} from '../../../commons/services/smart-public.service';
import {concat} from 'rxjs';
@Component({
  selector: 'app-org-agency',
  templateUrl: './org-agency.component.html',
  styleUrls: ['./org-agency.component.scss']
})
export class OrgAgencyComponent implements OnInit {
  public orgSearchData: any;
  public orgLoading = false;
  public orgPage: any = {pageNo: '1', pageSize: '10'};
  public orgThead: any = [
    {theadName: '公司名称', theadLabel: 'organizationName'},
    {theadName: '法人姓名', theadLabel: 'legalPerson'},
    {theadName: '公司地址', theadLabel: 'address'},
    {theadName: '公司类型', theadLabel: 'category'},
    {theadName: '企业邮箱', theadLabel: 'email'},
    {theadName: '企业传真', theadLabel: 'fax'},
    {theadName: '企业简介', theadLabel: 'introduction'},
    {theadName: '入驻时间', theadLabel: 'idt'},
  ];
  public orgFields: FieldBase<any>[] = [
    new Textbox({
      label: '头像:',
      placeholder: '上传头像',
      type: '',
      key: 'organizationName'
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
    })
  ];
  constructor(
    private orgSrv: OrganizationService,
    private smtSrv: SmartPublicService
  ) { }

  ngOnInit() {
    this.orgDataInit(this.orgPage);
  }
  // org数据初始化
  public orgDataInit(params): void {
    this.orgLoading = true;
    this.orgSrv.orgPageSearch(params).subscribe(
      (val) => {
        this.orgLoading = false;
        this.orgSearchData = val.data;
      }
    );
  }
  // ord添加之前数据初始化
  public orgAddInit(): void {
    concat(this.smtSrv.provinceSelect({})).subscribe(
      (val) => {
        console.log(val);
      }
    );
  }
  // org分页操作
  public orgPageChange(e): void {
    this.orgPage.pageNo = e.page;
    this.orgDataInit(this.orgPage);
  }
  // org删除操作
  public orgDelete(e): void {
    const arr = [];
    e.map((val) => {
      arr.push({id: val});
    });
    this.orgLoading = true;
    this.orgSrv.orgDelete({data: arr}).subscribe(
      () => {
        this.orgLoading = false;
        this.orgDataInit(this.orgPage);
      }
    );
  }
}
