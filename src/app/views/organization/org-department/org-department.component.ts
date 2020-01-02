import { Component, OnInit } from '@angular/core';
import {
  Dropdownbox,
  FieldBase,
  TextArea,
  Textbox,
  Treebox
} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {OrganizationService} from '../../../commons/services/organization.service';
import {SmartPublicService} from '../../../commons/services/smart-public.service';
import {TreeNode} from '../../../commons/components/api';

@Component({
  selector: 'app-org-department',
  templateUrl: './org-department.component.html',
  styleUrls: ['./org-department.component.scss']
})
export class OrgDepartmentComponent implements OnInit {
  public departList: any;
  public countyList: any;
  public departPage = {pageNo: '1', pageSize: '10'};
  public departLoading = false;
  public departThead = [
    {theadName: '唯一标识', theadLabel: 'deptId'},
    {theadName: '部门名称', theadLabel: 'deptName'},
    {theadName: '部门分类', theadLabel: 'deptCategory'},
    {theadName: '部门电话', theadLabel: 'telNumber'},
    {theadName: '部门传真', theadLabel: 'fax'},
    {theadName: '创建时间', theadLabel: 'idt'},
  ];
  public departFields: FieldBase<any>[] = [];
  public departUpdateData: any;
  public departCurrentPage: number = 1;
  public departTree: any;
  constructor(
    private orgSrv: OrganizationService,
    private smartPublicSrv: SmartPublicService,
  ) { }

  ngOnInit() {
    this.departListInit(this.departPage);
  }
  // depart数据初始化
  public departListInit(param): void {
    this.orgSrv.orgDepartmentSelect(param).subscribe(
      (val) => {
        this.departList = val.data;
      }
    );
  }

  // depart分页操作
  public departChange(e): void {
    this.departPage.pageNo = e.page;
    this.departListInit(this.departPage);
  }

  // depart删除操作
  public departDelete(e): void {
    const arr = [];
    e.map((val) => {
      arr.push({id: val});
    });
    this.departLoading = true;
    this.orgSrv.orgDepartmentDelete({data: arr}).subscribe(
      (val) => {
        this.departListInit(this.departPage);
      }
    );
  }

  // depart新增操作
  public departAdd(e): void {
    console.log(e);
    if (e) {
      this.orgSrv.orgDepartmentAdd(e).subscribe(() => this.departListInit(this.departPage));
    }
    else {
      this.orgSrv.orgDepartmentSelect({pageNo: 1, pageSize: 100}).subscribe(
        (val) => {
          this.departFields = [
            new Treebox({
              label: '所属组织',
              placeholder: '请选择所属组织',
              treeType: 'agency',
              type: 'text',
              key: 'organizationName',
              parent: 'agencyName',
              required: true,
            }),
            new Treebox({
              label: '所属组织',
              placeholder: '所属组织',
              treeType: 'agency',
              type: 'text',
              key: 'organizationId',
              parent: 'id',
              required: true,
              hidden: true
            }),
            new Dropdownbox({
              value: 'WLCWYFUZX_GCB',
              list: val.data.contents,
              label: '所属部门',
              placeholder: '请选择所属部门...',
              key: 'pid',
              optionName: 'deptName',
              optionValue: 'deptId',
              required: true,
            }),
            new Textbox({
              label: '部门名称',
              placeholder: '请输入部门名称',
              type: 'text',
              key: 'deptName',
              required: true,
            }),
            new Textbox({
              label: '部门类型',
              placeholder: '请输入部门类型',
              type: 'text',
              key: 'deptCategory',
              required: true,
            }),
            new Textbox({
              label: '部门电话',
              placeholder: '请输入部门电话',
              type: 'mobile',
              key: 'telNumber',
              required: true,
            }),
            new Textbox({
              label: '部门传真',
              placeholder: '请输入部门传真',
              type: 'mobile',
              key: 'fax',
              required: true,
            }),
            new TextArea({
              label: '部门描述',
              placeholder: '请输入部门描述',
              key: 'description',
              required: false,
            }),
          ];
        });
    }
  }

  // depart 修改操作
  public departUpdate(e): void {
    if (e.saving) {
      let i = null;
      const obj = this.departUpdateData;
      for (const prop in obj) {
        if (e.value.hasOwnProperty(prop) ) {
          this.departUpdateData[prop] = e.value[prop];
        }
      }
      if (!(isNaN(e.value.cityName)) || !(e.value.cityName === 'null')) {
        i = e.value.cityName;
        this.departUpdateData.cityName = this.countyList[i].cityName;
        this.departUpdateData.cityCode = this.countyList[i].cityCode;
      }
      this.departLoading = true;
      this.orgSrv.orgDepartmentUpdate(this.departUpdateData).subscribe(
        (val) => {
          this.departLoading = false;
          this.departListInit(this.departPage);
        }
      );
    }
    else {
      this.departUpdateData = e.value;
      if (this.departUpdateData.hasOwnProperty('udt')) {
        delete this.departUpdateData.udt;
      }
      this.smartPublicSrv.departmentTreeSelect({pageNo: 1, pageSize: 100}).subscribe(
        (val) => {
          this.countyList = val.data.contents;
          this.departFields = [
            new Textbox({
              value: `${e.value.districtName}`,
              label: '县名称',
              placeholder: '请输入县名称',
              key: 'districtName',
              required: true,
            }),
            new Textbox({
              value: `${e.value.districtCode}`,
              label: '县编号',
              placeholder: '请输入县编号',
              key: 'districtCode',
              required: true,
            }),
            new Dropdownbox({
              value: `${e.value.cityName}`,
              placeholder: '下拉选择市...',
              list: val.data.contents,
              label: '请选择所属市:',
              key: 'cityName',
              optionName: 'cityName'
            }),
          ];
        });
    }
  }

  // tree init
  public onTreeSelectChang(e): void {
    if (e.treeType === 'agency') {
      this.smartPublicSrv.orgTreeSelect().subscribe(
        (val) => {
          this.departTree = this.orgTreeInit(val.data);
          console.log(this.departTree);
        }
      );
    }
  }

  // 组织树数据初始化
  public orgTreeInit(data): any {
    const oneChild: TreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      const childnode: TreeNode = {};
      childnode.id = data[i]['id'];
      childnode.name = data[i]['organizationName'];
      childnode['agencyName'] = data[i]['organizationName'];
      childnode['organizationId'] = data[i]['organizationId'];
      childnode['districtCode'] = data[i]['districtCode'];
      childnode['districtName'] = data[i]['districtName'];
      childnode['openId'] = data[i]['openId'];
      childnode['postcode'] = data[i]['postcode'];
      childnode['regNo'] = data[i]['regNo'];
      childnode['latitude'] = data[i]['latitude'];
      childnode['longitude'] = data[i]['longitude'];
      childnode['legalPerson'] = data[i]['legalPerson'];
      childnode['address'] = data[i]['address'];
      childnode['foundDate'] = data[i]['foundDate'];
      childnode['fax'] = data[i]['fax'];
      childnode['telNumber'] = data[i]['telNumber'];
      childnode['email'] = data[i]['email'];
      childnode['scale'] = data[i]['scale'];
      childnode['category'] = data[i]['category'];
      childnode['introduction'] = data[i]['introduction'];
      childnode['billName'] = data[i]['billName'];
      childnode['pid'] = data[i]['pid'];
      childnode['pname'] = data[i]['pname'];
      childnode['idt'] = data[i]['idt'];
      childnode['udt'] = data[i]['udt'];
      if (data[i].organization2DTO) {
        childnode.children = this.orgTreeInit(data[i].organization2DTO);
      }
      else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
}
