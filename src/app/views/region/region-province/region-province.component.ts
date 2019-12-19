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
  public provinceFields: FieldBase<any>[] = [];
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
    this.smartPublicSrv.areaTreeSelect().subscribe(
      (val) => {
        this.provinceList = this.areaTreeInit(val.data);
      }
    );
  }

  // province删除操作
  public provinceDelete(e): void {
    this.regionSrv.regionTreeDelete({data: [{id: e.id}]}).subscribe(
      () => {
        this.provinceListInit();
      }
    );
  }

  // province新增操作
  public provinceAdd(e): void {
    if (e) {
      this.regionSrv.regionTreeAdd(e).subscribe(
        () => {
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
      ];
    }
  }

  // province 修改操作
  public provinceUpdate(e): void {
    if (e.saving) {
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          if (item in this.provinceUpdateData) {
            this.provinceUpdateData[item] = e.value[item];
          }
        }
      }
      this.regionSrv.regionTreeUpdate(this.provinceUpdateData).subscribe(
        () => {
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
          hidden: true
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
