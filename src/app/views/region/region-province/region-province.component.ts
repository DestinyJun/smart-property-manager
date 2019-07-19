import {Component, OnInit} from '@angular/core';
import {FieldBase, Textbox, Treebox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {SmartPublicService} from '../../../commons/services/smart-public.service';

@Component({
  selector: 'app-region-province',
  templateUrl: './region-province.component.html',
  styleUrls: ['./region-province.component.scss']
})
export class RegionProvinceComponent implements OnInit {
  public provinceList: any;
  public provinceLoading = false;
  public provinceThead = [
    {theadName: '唯一标识', theadLabel: 'id'},
    {theadName: '区划名称', theadLabel: 'divisonName'},
    {theadName: '子节点', theadLabel: 'divisonDTO'},
    {theadName: '区划编号', theadLabel: 'divisonCode'},
    {theadName: '区划标识', theadLabel: 'flag'},
    {theadName: '创建时间', theadLabel: 'idt'},
    {theadName: '最后修改时间', theadLabel: 'udt'},
  ];
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
  ) { }

  ngOnInit() {
    this.provinceListInit();
  }
  // province初始化查询
  public provinceListInit(): void {
    this.provinceLoading = true;
    this.smartPublicSrv.areaTreeSelect().subscribe(
      (val) => {
        console.log(val);
        this.provinceLoading = false;
        this.provinceList = val.data;
      }
    );
  }
  // province删除操作
  public provinceDelete(e): void {
    this.provinceLoading = true;
    this.smartPublicSrv.areaTreeDelete({data: [{id: e.id}]}).subscribe(
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
      this.smartPublicSrv.areaTreeAdd(e).subscribe(
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
          label: '请选择所属区域',
          placeholder: '点击选择所属区域',
          type: 'text',
          key: 'name',
          required: true,
          disabled: true
        }),
        new Treebox({
          label: '区域flag',
          placeholder: '区域flag',
          type: 'text',
          key: 'flag',
          required: false,
          hidden: true
        }),
        new Treebox({
          label: '区域pid',
          placeholder: '请输入区域pid',
          type: 'text',
          key: 'pid',
          parent: 'divisonCode',
          required: false,
          hidden: true
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
      this.smartPublicSrv.areaTreeUpdate(this.provinceUpdateData).subscribe(
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
      const ignore = ['udt', 'children'];
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
          required: true,
          disabled: true
        }),
        new Treebox({
          label: '区域flag',
          value: `${e.value.flag}`,
          placeholder: '区域flag',
          type: 'text',
          key: 'flag',
          required: false,
          hidden: true
        }),
        new Treebox({
          label: '区域pid',
          value: `${e.value.id}`,
          placeholder: '请输入区域pid',
          type: 'text',
          key: 'pid',
          parent: 'divisonCode',
          required: false,
          hidden: true
        }),
      ];
    }
  }
}
