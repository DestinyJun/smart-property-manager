import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '../../../commons/services/organization.service';
import {
  Dropdownbox,
  FieldBase,
  TextArea,
  Textbox,
  Treebox
} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {SmartPublicService} from '../../../commons/services/smart-public.service';
import {TreeNode} from '../../../commons/components/api';
@Component({
  selector: 'app-org-agency',
  templateUrl: './org-agency.component.html',
  styleUrls: ['./org-agency.component.scss']
})
export class OrgAgencyComponent implements OnInit {
  public agencyList: any;
  public agencyTree: any;
  public agencyLoading = false;
  public agencyFields: FieldBase<any>[] = [];
  public agencyAlertsDis: any = [];
  public agencyUpdateData: any = {};
  constructor(
    private orgSrv: OrganizationService,
    private smartPublicSrv: SmartPublicService,
  ) { }

  ngOnInit() {
    this.agencyListInit();
  }
  // agency初始化查询
  public agencyListInit(): void {
    this.smartPublicSrv.orgTreeSelect().subscribe(
      (val) => {
        this.agencyList = this.orgTreeInit(val.data);
      }
    );
  }

  // agency删除操作
  public agencyDelete(e): void {
    this.orgSrv.orgAgencyDelete({data: [{id: e.id}]}).subscribe(
      (val) => {
        this.agencyListInit();
      }
    );
  }

  // agency新增操作
  public agencyAdd(e): void {
    if (e) {
      this.orgSrv.orgAgencyAdd(e).subscribe(
        (val) => {
          this.agencyListInit();
        }
      );
    }
    else {
      this.agencyFields = [
        new Textbox({
          label: '组织名称',
          placeholder: '请输入组织名称',
          type: 'text',
          key: 'organizationName',
          required: true,
        }),
        new Treebox({
          label: '所属区域',
          placeholder: '请选择所属区域',
          type: 'text',
          key: 'districtName',
          parent: 'areaName',
          treeType: 'area',
        }),
        new Treebox({
          label: '所属区域',
          placeholder: '所属区域',
          type: 'text',
          key: 'districtCode',
          parent: 'divisonCode',
          treeType: 'area',
          required: true,
          hidden: true
        }),
        new Textbox({
          label: '公众号openID',
          placeholder: '请输入公众号openID',
          type: 'text',
          key: 'openId',
          required: true,
        }),
        new Textbox({
          label: '邮编',
          placeholder: '请输入邮编',
          type: 'text',
          key: 'postcode',
          required: true,
        }),
        new Textbox({
          label: '工商注册号',
          placeholder: '请输入工商注册号',
          type: 'text',
          key: 'regNo',
          required: true,
        }),
        new Textbox({
          label: '纬度',
          placeholder: '请输入纬度',
          type: 'number',
          key: 'latitude',
          required: true,
        }),
        new Textbox({
          label: '经度',
          placeholder: '请输入经度',
          type: 'number',
          key: 'longitude',
          required: true,
        }),
        new Textbox({
          label: '法人',
          placeholder: '请输入法人',
          type: 'text',
          key: 'legalPerson',
          required: true,
        }),
        new Textbox({
          label: '公司地址',
          placeholder: '请输入公司地址',
          type: 'text',
          key: 'address',
          required: true,
        }),
        new Textbox({
          label: '成立日期',
          placeholder: '请输入成立日期',
          type: 'text',
          key: 'foundDate',
          required: true,
        }),
        new Textbox({
          label: '传真',
          placeholder: '请输入传真',
          type: 'mobile',
          key: 'fax',
          required: true,
        }),
        new Textbox({
          label: '单位电话',
          placeholder: '请输入单位电话',
          type: 'mobile',
          key: 'telNumber',
          required: true,
        }),
        new Textbox({
          label: '单位邮箱',
          placeholder: '请输入邮箱',
          type: 'email',
          key: 'email',
          required: true,
        }),
        new Textbox({
          label: '公司规模',
          placeholder: '请输入公司人数规模',
          type: 'number',
          key: 'scale',
          required: true,
        }),
        new Textbox({
          label: '公司类型',
          placeholder: '请输入公司类型',
          type: 'text',
          key: 'category',
          required: true,
        }),
        new TextArea({
          label: '公司简介',
          placeholder: '请输入公司简介',
          key: 'introduction',
          required: false,
        }),
        new Textbox({
          label: '票据名称',
          placeholder: '请输入票据名称',
          type: 'text',
          key: 'billName',
          required: true,
        }),
        new Treebox({
          label: '所属组织',
          placeholder: '请选择所属组织',
          type: 'text',
          key: 'agencyName',
          parent: 'agencyName',
          treeType: 'agency',
          disabled: true,
        }),
        new Treebox({
          label: '所属组织',
          placeholder: '所属组织',
          type: 'text',
          key: 'pid',
          treeType: 'agency',
          parent: 'id',
          required: true,
          hidden: true
        }),
      ];
    }
  }

  // agency 修改操作
  public agencyUpdate(e): void {
    if (e.saving) {
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          if (item in this.agencyUpdateData) {
            this.agencyUpdateData[item] = e.value[item];
          }
        }
      }
      this.orgSrv.orgAgencyUpdate(this.agencyUpdateData).subscribe(
        (val) => {
          this.agencyListInit();
        }
      );
    }
    else {
      const ignore = ['udt', 'children'];
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          this.agencyUpdateData[item] = e.value[item];
        }
      }
      for (let i = 0; i < ignore.length ; i++) {
        if (ignore[i] in this.agencyUpdateData) {
          delete this.agencyUpdateData[ignore[i]];
        }
      }
      if (this.agencyUpdateData.hasOwnProperty('agencyName')) {
        this.agencyUpdateData['organizationName'] =  this.agencyUpdateData.agencyName;
        delete this.agencyUpdateData.agencyName;
      }
      this.agencyFields = [
        new Textbox({
          label: '组织名称',
          value: this.agencyUpdateData.organizationName,
          placeholder: '请输入组织名称',
          type: 'text',
          key: 'organizationName',
          required: true,
        }),
        new Treebox({
          label: '区域名称',
          value: this.agencyUpdateData.districtName,
          placeholder: '请选择所属区域',
          type: 'text',
          key: 'districtName',
          parent: 'areaName',
          treeType: 'area',
        }),
        new Treebox({
          label: '区域编码',
          value: this.agencyUpdateData.districtCode,
          placeholder: '请输入区域编码',
          type: 'text',
          key: 'districtCode',
          parent: 'divisonCode',
          treeType: 'area',
          required: true,
          hidden: false
        }),
        new Textbox({
          label: '公众号openID',
          value: this.agencyUpdateData.openId,
          placeholder: '请输入公众号openID',
          type: 'text',
          key: 'openId',
          required: true,
        }),
        new Textbox({
          label: '邮编',
          value: this.agencyUpdateData.postcode,
          placeholder: '请输入邮编',
          type: 'text',
          key: 'postcode',
          required: true,
        }),
        new Textbox({
          label: '工商注册号',
          value: this.agencyUpdateData.regNo,
          placeholder: '请输入工商注册号',
          type: 'text',
          key: 'regNo',
          required: true,
        }),
        new Textbox({
          label: '纬度',
          value: this.agencyUpdateData.latitude,
          placeholder: '请输入纬度',
          type: 'number',
          key: 'latitude',
          required: true,
        }),
        new Textbox({
          label: '经度',
          value: this.agencyUpdateData.longitude,
          placeholder: '请输入经度',
          type: 'number',
          key: 'longitude',
          required: true,
        }),
        new Textbox({
          label: '法人',
          value: this.agencyUpdateData.legalPerson,
          placeholder: '请输入法人',
          type: 'text',
          key: 'legalPerson',
          required: true,
        }),
        new Textbox({
          label: '公司地址',
          value: this.agencyUpdateData.address,
          placeholder: '请输入公司地址',
          type: 'text',
          key: 'address',
          required: true,
        }),
        new Textbox({
          label: '成立日期',
          value: this.agencyUpdateData.foundDate,
          placeholder: '请输入成立日期',
          type: 'text',
          key: 'foundDate',
          required: true,
        }),
        new Textbox({
          label: '传真',
          value: this.agencyUpdateData.fax,
          placeholder: '请输入传真',
          type: 'mobile',
          key: 'fax',
          required: true,
        }),
        new Textbox({
          label: '单位电话',
          value: this.agencyUpdateData.telNumber,
          placeholder: '请输入单位电话',
          type: 'mobile',
          key: 'telNumber',
          required: true,
        }),
        new Textbox({
          label: '单位邮箱',
          value: this.agencyUpdateData.email,
          placeholder: '请输入邮箱',
          type: 'email',
          key: 'email',
          required: true,
        }),
        new Textbox({
          label: '公司规模',
          value: this.agencyUpdateData.scale,
          placeholder: '请输入公司人数规模',
          type: 'number',
          key: 'scale',
          required: true,
        }),
        new Textbox({
          label: '公司类型',
          value: this.agencyUpdateData.category,
          placeholder: '请输入公司类型',
          type: 'text',
          key: 'category',
          required: true,
        }),
        new TextArea({
          label: '公司简介',
          value: this.agencyUpdateData.introduction,
          placeholder: '请输入公司简介',
          key: 'introduction',
          required: false,
        }),
        new Textbox({
          label: '票据名称',
          value: this.agencyUpdateData.billName,
          placeholder: '请输入票据名称',
          type: 'text',
          key: 'billName',
          required: true,
        }),
        new Treebox({
          label: '所属组织',
          placeholder: '请选择所属组织',
          type: 'text',
          key: 'agencyName',
          parent: 'agencyName',
          treeType: 'agency',
          disabled: true,
        }),
        new Treebox({
          label: '所属组织',
          value: this.agencyUpdateData.pid,
          placeholder: '所属组织',
          type: 'text',
          key: 'pid',
          treeType: 'agency',
          parent: 'organizationId',
          hidden: true
        }),
      ];
    }
  }

  // tree init
  public onTreeSelectChang(e): void {
    if (e.treeType === 'agency') {
      this.smartPublicSrv.orgTreeSelect().subscribe(
        (val) => {
          this.agencyTree = this.orgTreeInit(val.data);
        }
      );
    }
    if (e.treeType === 'area') {
      this.smartPublicSrv.areaTreeSelect().subscribe(
        (val) => {
          this.agencyTree = this.areaTreeInit(val.data);
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

  // 区域树数据初始化
  public areaTreeInit(data): any {
    const oneChild: TreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      const childnode: TreeNode = {};
      childnode.id = data[i]['id'];
      childnode.name = data[i]['divisonName'];
      childnode['areaName'] = data[i]['divisonName'];
      childnode['divisonCode'] = data[i]['divisonCode'];
      childnode['pid'] = data[i]['pid'];
      childnode['idt'] = data[i]['idt'];
      childnode['udt'] = data[i]['udt'];
      if (data[i].divisonDTO) {
        childnode.children = this.areaTreeInit(data[i].divisonDTO);
      }
      else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
}
