import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '../../../commons/services/organization.service';
import {
  Dropdownbox,
  FieldBase,
  TextArea,
  Textbox,
  Treebox
} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {Radiosbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field/radiosbox';
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
  public agencyAreaTree: any;
  public agencyLoading = false;
  public agencyFields: FieldBase<any>[] = [
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
    this.agencyLoading = true;
    this.smartPublicSrv.orgTreeSelect().subscribe(
      (val) => {
        this.agencyLoading = false;
        this.agencyList = this.orgTreeInit(val.data);
      }
    );
  }
  // agency删除操作
  public agencyDelete(e): void {
    this.agencyLoading = true;
    this.orgSrv.orgAgencyDelete({permitCodes: `${e.agencyCode}`}).subscribe(
      (val) => {
        this.agencyLoading = false;
        this.agencyAlertsDis.push({
          type: 'success',
          msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
          timeout: 2000
        });
        this.agencyListInit();
      }
    );
  }
  // agency新增操作
  public agencyAdd(e): void {
    if (e) {
      console.log(e);
      this.agencyLoading = true;
      this.orgSrv.orgAgencyAdd(e).subscribe(
        (val) => {
          this.agencyAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.agencyLoading = false;
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
       /* new Textbox({
          label: '公众号openId',
          placeholder: '请输入公众号openId',
          key: 'openId',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '邮编',
          placeholder: '请输入邮编',
          key: 'postcode',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '工商注册号',
          placeholder: '请输入工商注册号',
          key: 'regNo',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '纬度',
          placeholder: '请输入纬度',
          key: 'latitude',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '经度',
          placeholder: '请输入经度',
          key: 'longitude',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '法人',
          placeholder: '请输入法人',
          key: 'legalPerson',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '公司地址',
          placeholder: '请输入公司地址',
          key: 'address',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '成立日期',
          placeholder: '请输入成立日期',
          key: 'foundDate',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '传真',
          placeholder: '请输入传真',
          key: 'fax',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '单位电话',
          placeholder: '请输入单位电话',
          key: 'telNumber',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '邮箱',
          placeholder: '请输入邮箱',
          key: 'email',
          type: 'text',
          required: true,
        }),
        new Dropdownbox({
          value: '100-500人',
          list: [
            {name: '1-100人', value: '1-100人', selected: true},
            {name: '100-500人', value: '100-500人', selected: false},
            {name: '大于500人', value: '大于500人', selected: false}
          ],
          label: '请选择公司规模:',
          key: 'scale'
        }),*/
        new Dropdownbox({
          value: '有限公司',
          list: [
            {name: '有限公司', value: '有限公司'},
            {name: '股份公司', value: '股份公司'},
            {name: '股份有限公司', value: '股份有限公司'}
          ],
          label: '请选择公司类型:',
          key: 'category'
        }),
        new Treebox({
          label: '所属组织',
          placeholder: '请选择所属组织',
          type: 'text',
          key: 'agencyName',
          parent: 'agencyName',
          treeType: 'agency',
          disabled: true
        }),
        new Treebox({
          label: '所属组织',
          placeholder: '所属组织',
          type: 'text',
          key: 'pid',
          treeType: 'agency',
          parent: 'id',
          required: false,
          hidden: false
        }),
        new Treebox({
          label: '所属区域',
          placeholder: '请选择所属区域',
          type: 'text',
          key: 'areaName',
          parent: 'areaName',
          treeType: 'area',
          disabled: true
        }),
        new Treebox({
          label: '所属区域',
          placeholder: '所属区域',
          type: 'text',
          key: 'divisonCode',
          treeType: 'area',
          parent: 'divisonCode',
          required: true,
          hidden: false
        }),
        /*new TextArea({
          value: '',
          label: '备注',
          placeholder: '想备注的话就写在这里',
          row: 5,
          key: 'remark',
          required: false,
        }),
        new Radiosbox({
          value: '1',
          list: [{name: '菜单权限', type: '1'}, {name: '功能权限', type: '2'}],
          label: '菜单类型：',
          key: 'menuagencyFlag'
        }),*/
      ];
    }
  }
  // agency 修改操作
  public agencyUpdate(e): void {
    if (e.saving) {
      this.agencyLoading = true;
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          if (item in this.agencyUpdateData) {
            this.agencyUpdateData[item] = e.value[item];
          }
        }
      }
      this.orgSrv.orgAgencyUpdate(this.agencyUpdateData).subscribe(
        (val) => {
          this.agencyLoading = false;
          if (val.status !== '1000') {
            this.agencyAlertsDis.push({
              type: 'danger',
              msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
              timeout: 3000
            });
            return;
          }
          this.agencyAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
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
      if (this.agencyUpdateData.hasOwnProperty('name')) {
        this.agencyUpdateData['title'] =  this.agencyUpdateData.name;
        delete this.agencyUpdateData.name;
      }
      this.agencyFields = [
        new Textbox({
          label: '权限名称',
          value: this.agencyUpdateData.title,
          placeholder: '请输入权限名称',
          type: 'text',
          key: 'title',
          required: true,
        }),
        new Textbox({
          label: '权限编码',
          value: e.value.agencyCode,
          placeholder: '请输入权限编码',
          key: 'agencyCode',
          type: 'text',
          required: true,
        }),
        new Radiosbox({
          value: `${e.value.menuagencyFlag}`,
          list: [{name: '菜单权限', type: '1'}, {name: '功能权限', type: '2'}],
          label: '菜单类型：',
          key: 'menuagencyFlag'
        }),
        new Radiosbox({
          value: `${e.value.agencyOrder}`,
          list: [{name: '子系统', type: '0'}, {name: '一级菜单', type: '1'}, {name: '二级菜单', type: '2'}],
          label: '模块：',
          key: 'agencyOrder'
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
      childnode.id = data[i]['organizationId'];
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
      childnode['introducti'] = data[i]['introducti'];
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
