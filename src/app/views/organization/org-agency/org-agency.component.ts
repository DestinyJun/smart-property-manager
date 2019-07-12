import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '../../../commons/services/organization.service';

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
  constructor(
    public orgSrv: OrganizationService,
  ) { }

  ngOnInit() {
    this.orgDataInit(this.orgPage);
  }
  // org init
  public orgDataInit(params): void {
    this.orgLoading = true;
    this.orgSrv.orgPageSearch(params).subscribe(
      (val) => {
        this.orgLoading = false;
        this.orgSearchData = val.data;
      }
    );
  }
  // org page change
  public orgPageChange(e): void {
    this.orgPage.pageNo = e.page;
    this.orgDataInit(this.orgPage);
  }
  // org delete
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
