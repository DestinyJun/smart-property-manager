import {Component, OnInit} from '@angular/core';
import {FieldBase, Textbox, Treebox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {SmartPublicService} from '../../../commons/services/smart-public.service';
import {TreeNode} from '../../../commons/components/api';
import {RegionService} from '../../../commons/services/region.service';

@Component({
  selector: 'app-region-province',
  templateUrl: './region-province.component.html',
  styleUrls: ['./region-province.component.scss']
})
export class RegionProvinceComponent implements OnInit {
  public provinceList: any;
  public provinceAreaTree: any;
  public provinceLoading = false;
  public provinceFields: FieldBase<any>[] = [
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
  public provinceAlertsDis: any = [];
  public provinceUpdateData: any = {};
  constructor(
    private smartPublicSrv: SmartPublicService,
    private regionSrv: RegionService,
  ) { }

  ngOnInit() {
    this.provinceListInit();
  }
  // province初始化查询
  public provinceListInit(): void {
    this.provinceLoading = true;
    this.smartPublicSrv.areaTreeSelect().subscribe(
      (val) => {
        this.provinceLoading = false;
        this.provinceList = this.areaTreeInit(val.data);
      }
    );
  }
  // province删除操作
  public provinceDelete(e): void {
    this.provinceLoading = true;
    this.regionSrv.regionTreeDelete({data: [{id: e.id}]}).subscribe(
      (val) => {
        this.provinceLoading = false;
        this.provinceAlertsDis.push({
          type: 'success',
          msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
          timeout: 2000
        });
        this.provinceListInit();
      }
    );
  }
  // province新增操作
  public provinceAdd(e): void {
    if (e) {
      this.provinceLoading = true;
      this.regionSrv.regionTreeAdd(e).subscribe(
        (val) => {
          this.provinceAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.provinceLoading = false;
          this.provinceListInit();
        }
      );
    }
    else {
      this.provinceFields = [
        new Textbox({
          label: '区域名称',
          placeholder: '请输入区域名称',
          key: 'divisonName',
          type: 'text',
          required: true,
        }),
        new Textbox({
          label: '区域编号',
          placeholder: '请输入区域编号',
          type: 'number',
          key: 'divisonCode',
          required: true,
        }),
        new Treebox({
          label: '所属区域',
          placeholder: '点击选择所属区域',
          type: 'text',
          key: 'areaName',
          parent: 'areaName',
          treeType: 'area',
          required: true,
          disabled: true
        }),
        new Treebox({
          label: '所属区域',
          placeholder: '所属区域',
          type: 'text',
          key: 'pid',
          parent: 'divisonCode',
          treeType: 'area',
          required: false,
          hidden: true
        }),
        new Textbox({
          label: '区域编号',
          placeholder: '请输入区域编号',
          type: 'number',
          key: 'divisonCode',
          required: true,
        }),
      ];
    }
  }
  // province 修改操作
  public provinceUpdate(e): void {
    if (e.saving) {
      this.provinceLoading = true;
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          if (item in this.provinceUpdateData) {
            this.provinceUpdateData[item] = e.value[item];
          }
        }
      }
      this.regionSrv.regionTreeUpdate(this.provinceUpdateData).subscribe(
        (val) => {
          this.provinceLoading = false;
          if (val.status !== '1000') {
            this.provinceAlertsDis.push({
              type: 'danger',
              msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
              timeout: 3000
            });
          return;
          }
          this.provinceAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.provinceListInit();
        }
      );
    }
    else {
      const ignore = ['udt', 'children', 'flag'];
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          this.provinceUpdateData[item] = e.value[item];
        }
      }
      for (let i = 0; i < ignore.length ; i++) {
        if (ignore[i] in this.provinceUpdateData) {
          delete this.provinceUpdateData[ignore[i]];
        }
      }
      if (this.provinceUpdateData.hasOwnProperty('name')) {
        this.provinceUpdateData['divisonName'] =  this.provinceUpdateData.name;
        delete this.provinceUpdateData.name;
      }
      this.provinceFields = [
        new Textbox({
          label: `区域名称`,
          value: `${e.value.name}`,
          placeholder: '请输入新区域名称',
          key: 'divisonName',
          required: true,
        }),
        new Textbox({
          label: `区域编码`,
          value: `${e.value.divisonCode}`,
          placeholder: '请输入新区域编码',
          key: 'divisonCode',
          required: true,
        }),
        new Treebox({
          label: '请选择所属区域',
          placeholder: '点击选择所属区域',
          type: 'text',
          key: 'name',
          parent: 'name',
          required: true,
          disabled: true
        }),
        new Treebox({
          label: '区域pid',
          value: `${e.value.pid}`,
          placeholder: '请输入区域pid',
          type: 'text',
          key: 'pid',
          parent: 'divisonCode',
          required: false,
          hidden: false
        }),
      ];
    }
  }
  // tree init
  public onTreeSelectChang(e): void {
    if (e.treeType === 'area') {
      this.smartPublicSrv.areaTreeSelect().subscribe(
        (val) => {
          this.provinceAreaTree = this.areaTreeInit(val.data);
        }
      );
    }
  }
  // tree 数据初始化
  public areaTreeInit(data): any {
    const oneChild: TreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      const childnode: TreeNode = {};
      childnode.id = data[i]['id'];
      childnode.name = data[i]['divisonName'];
      childnode['areaName'] = data[i]['divisonName'];
      childnode['divisonCode'] = data[i]['divisonCode'];
      childnode['flag'] = data[i]['flag'];
      childnode['idt'] = data[i]['idt'];
      childnode['pid'] = data[i]['pid'];
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
