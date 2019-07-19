import { Component, OnInit } from '@angular/core';
import {FieldBase, Textbox, Dropdownbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {RegionService} from '../../../commons/services/region.service';
import {SmartPublicService} from '../../../commons/services/smart-public.service';

@Component({
  selector: 'app-region-county',
  templateUrl: './region-county.component.html',
  styleUrls: ['./region-county.component.scss']
})
export class RegionCountyComponent implements OnInit {
  public countyList: any;
  public cityList: any;
  public countyPage = {pageNo: '1', pageSize: '10'};
  public countyLoading = false;
  public countyThead = [
    {theadName: '唯一标识', theadLabel: 'id'},
    {theadName: '名称', theadLabel: 'districtName'},
    {theadName: '标识码', theadLabel: 'districtCode'},
    {theadName: '所属市级', theadLabel: 'cityName'},
    {theadName: '创建时间', theadLabel: 'idt'},
    {theadName: '最后修改时间', theadLabel: 'udt'},
  ];
  public countyFields: FieldBase<any>[] = [];
  public countyAlertsDis: any = [];
  public countyUpdateData: any;
  public countyCurrentPage: number = 1;
  constructor(
    private smartPublicSrv: SmartPublicService,
  ) { }

  ngOnInit() {
    this.countyListInit(this.countyPage);
  }
// county数据初始化
  public countyListInit(param): void {
    this.countyLoading = true;
    this.smartPublicSrv.areaTreeSelect().subscribe(
      (val) => {
        console.log(val);
        this.countyLoading = false;
        this.countyList = val.data;
      }
    );
  }
  // county分页操作
  public countyChange(e): void {
    this.countyPage.pageNo = e.page;
    this.countyListInit(this.countyPage);
  }
  // county删除操作
  public countyDelete(e): void {
    const arr = [];
    e.map((val) => {
      arr.push({id: val});
    });
    this.countyLoading = true;
    this.smartPublicSrv.areaTreeDelete({data: arr}).subscribe(
      (val) => {
        this.countyLoading = false;
        this.countyAlertsDis.push({
          type: 'success',
          msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
          timeout: 2000
        });
        this.countyListInit(this.countyPage);
      }
    );
  }
  // county新增操作
  public countyAdd(e): void {
    const i = e.cityName;
    if (e) {
      this.countyLoading = true;
      this.smartPublicSrv.areaTreeAdd({
        districtName: e.districtName,
        districtCode: e.districtCode,
        cityName: this.cityList[i].cityName,
        cityCode: this.cityList[i].cityCode,
      }).subscribe(
        (val) => {
          this.countyAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.countyLoading = false;
          this.countyListInit(this.countyPage);
        }
      );
    } else {
      this.smartPublicSrv.areaTreeSelect().subscribe(
        (val) => {
          this.cityList = val.data.contents;
          this.countyFields = [
            new Textbox({
              label: '县名称',
              placeholder: '请输入县名称',
              key: 'districtName',
              required: true,
            }),
            new Textbox({
              label: '县编号',
              placeholder: '请输入县编号',
              key: 'districtCode',
              required: true,
            }),
            new Dropdownbox({
              list: val.data.contents,
              label: '请选择所属省:',
              placeholder: '下拉选择省...',
              key: 'provinceName',
              optionName: 'provinceName',
              required: true,
              linkage: true,
              linkageType: 'zoning'
            }),
          ];
        }
      );
    }
  }
  // county 修改操作
  public countyUpdate(e): void {
    if (e.saving) {
      let i = null;
      const obj = this.countyUpdateData;
      for (const prop in obj) {
        if (e.value.hasOwnProperty(prop) ) {
          this.countyUpdateData[prop] = e.value[prop];
        }
      }
      if (!(isNaN(e.value.cityName)) || !(e.value.cityName === 'null')) {
        i = e.value.cityName;
        this.countyUpdateData.cityName = this.cityList[i].cityName;
        this.countyUpdateData.cityCode = this.cityList[i].cityCode;
      }
      this.countyLoading = true;
      this.smartPublicSrv.areaTreeUpdate(this.countyUpdateData).subscribe(
        (val) => {
          this.countyLoading = false;
          this.countyAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.countyListInit(this.countyPage);
        }
      );
    }
    else {
      this.countyUpdateData = e.value;
      if (this.countyUpdateData.hasOwnProperty('udt')) {
        delete this.countyUpdateData.udt;
      }
      this.smartPublicSrv.areaTreeSelect().subscribe(
        (val) => {
          this.cityList = val.data.contents;
          this.countyFields = [
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
}
