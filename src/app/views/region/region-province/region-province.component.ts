import { Component, OnInit } from '@angular/core';
import {RegionService} from '../../../commons/services/region.service';
import {FieldBase, Textbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';

@Component({
  selector: 'app-region-province',
  templateUrl: './region-province.component.html',
  styleUrls: ['./region-province.component.scss']
})
export class RegionProvinceComponent implements OnInit {
  public provinceList: any;
  public provincePage = {pageNo: '1', pageSize: '10'};
  public provinceLoading = false;
  public provinceThead = [
    {theadName: '唯一标识', theadLabel: 'id'},
    {theadName: '名称', theadLabel: 'provinceName'},
    {theadName: '标识码', theadLabel: 'provinceCode'},
    {theadName: '创建时间', theadLabel: 'idt'},
    {theadName: '最后修改时间', theadLabel: 'udt'},
  ];
  public provinceFields: FieldBase<any>[] = [];
  public provinceAlertsDis: any = [];
  public provinceUpdateData: any;
  constructor(
    private regionSrv: RegionService
  ) { }

  ngOnInit() {
    this.provinceListInit(this.provincePage);
  }
  // province数据初始化
  public provinceListInit(param): void {
    this.provinceLoading = true;
    this.regionSrv.regionProvinceSearch(param).subscribe(
      (val) => {
        console.log(val);
        this.provinceLoading = false;
        this.provinceList = val.data;
      }
    );
  }
  // province分页操作
  public provinceChange(e): void {
    this.provincePage.pageNo = e.page;
    this.provinceListInit(this.provincePage);
  }
  // province删除操作
  public provinceDelete(e): void {
    const arr = [];
    e.map((val) => {
      arr.push({id: val});
    });
    this.provinceLoading = true;
    this.regionSrv.regionProvinceDelete({data: arr}).subscribe(
      (val) => {
        this.provinceLoading = false;
        this.provinceAlertsDis.push({
          type: 'success',
          msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
          timeout: 2000
        });
        this.provinceListInit(this.provincePage);
      }
    );
  }
  // province新增操作
  public provinceAdd(e): void {
    if (e) {
      this.provinceLoading = true;
      this.regionSrv.regionProvinceAdd(e).subscribe(
        (val) => {
          this.provinceAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.provinceLoading = false;
          this.provinceListInit(this.provincePage);
        }
      );
    } else {
      this.provinceFields = [
        new Textbox({
          label: '省名称',
          placeholder: '请输入省名称',
          key: 'provinceName',
          required: true,
        }),
        new Textbox({
          label: '省编号',
          placeholder: '请输入省编号',
          key: 'provinceCode',
          required: true,
        }),
      ];
    }
  }
  // province 修改操作
  public provinceUpdate(e): void {
    console.log(e);
    if (e.saving) {
      this.provinceLoading = true;
      for (const item in e.value) {
        if (e.value.hasOwnProperty(item)) {
          this.provinceUpdateData[item] = e.value[item];
        }
      }
      this.regionSrv.regionProvinceUpdate(this.provinceUpdateData).subscribe(
        (val) => {
          this.provinceLoading = false;
          this.provinceListInit(this.provincePage);
        }
      );
    } else {
      this.provinceUpdateData = e.value;
      if (this.provinceUpdateData.hasOwnProperty('udt')) {
        delete this.provinceUpdateData.udt;
      }
      this.provinceFields = [
        new Textbox({
          label: `省名称`,
          value: `${e.value.provinceName}`,
          placeholder: '请输入省名称',
          key: 'provinceName',
          required: true,
        }),
        new Textbox({
          label: `省编号`,
          value: `${e.value.provinceCode}`,
          placeholder: '请输入省编号',
          key: 'provinceCode',
          required: true,
        }),
      ];
    }
  }
}
