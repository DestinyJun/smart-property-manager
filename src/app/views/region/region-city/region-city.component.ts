import { Component, OnInit } from '@angular/core';
import {FieldBase, Textbox, Dropdownbox} from '../../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {RegionService} from '../../../commons/services/region.service';
import {SmartPublicService} from '../../../commons/services/smart-public.service';

@Component({
  selector: 'app-region-city',
  templateUrl: './region-city.component.html',
  styleUrls: ['./region-city.component.scss']
})
export class RegionCityComponent implements OnInit {
  public cityList: any;
  public provinceList: any;
  public cityPage = {pageNo: '1', pageSize: '10'};
  public cityLoading = false;
  public cityThead = [
    {theadName: '唯一标识', theadLabel: 'id'},
    {theadName: '名称', theadLabel: 'cityName'},
    {theadName: '标识码', theadLabel: 'cityCode'},
    {theadName: '所属省级', theadLabel: 'provinceName'},
    {theadName: '创建时间', theadLabel: 'idt'},
    {theadName: '最后修改时间', theadLabel: 'udt'},
  ];
  public cityFields: FieldBase<any>[] = [];
  public cityAlertsDis: any = [];
  public cityUpdateData: any;
  public cityCurrentPage: number = 1;
  constructor(
    private regionSrv: RegionService,
    private smartPublicSrv: SmartPublicService,
  ) { }

  ngOnInit() {
    this.cityListInit(this.cityPage);
  }
  // city数据初始化
  public cityListInit(param): void {
    this.cityLoading = true;
    this.regionSrv.regionCitySearch(param).subscribe(
      (val) => {
        this.cityLoading = false;
        this.cityList = val.data;
      }
    );
  }
  // city分页操作
  public cityChange(e): void {
    this.cityPage.pageNo = e.page;
    this.cityListInit(this.cityPage);
  }
  // city删除操作
  public cityDelete(e): void {
    const arr = [];
    e.map((val) => {
      arr.push({id: val});
    });
    this.cityLoading = true;
    this.regionSrv.regionCityDelete({data: arr}).subscribe(
      (val) => {
        this.cityLoading = false;
        this.cityAlertsDis.push({
          type: 'success',
          msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
          timeout: 2000
        });
        this.cityListInit(this.cityPage);
      }
    );
  }
  // city新增操作
  public cityAdd(e): void {
    const i = e.provinceName;
    if (e) {
      this.cityLoading = true;
      this.regionSrv.regionCityAdd({
        cityName: e.cityName,
        cityCode: e.cityCode,
        provinceName: this.provinceList[i].provinceName,
        provinceCode: this.provinceList[i].provinceCode,
      }).subscribe(
        (val) => {
          this.cityAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.cityLoading = false;
          this.cityListInit(this.cityPage);
        }
      );
    } else {
      this.smartPublicSrv.areaTreeSelect().subscribe(
        (val) => {
          this.provinceList = val.data.contents;
          this.cityFields = [
            new Textbox({
              label: '市名称',
              placeholder: '请输入市名称',
              key: 'cityName',
              required: true,
            }),
            new Textbox({
              label: '市编号',
              placeholder: '请输入市编号',
              key: 'cityCode',
              required: true,
            }),
            new Dropdownbox({
              list: val.data.contents,
              label: '请选择所属省:',
              placeholder: '下拉选择省份...',
              key: 'provinceName',
              optionName: 'provinceName',
              required: true,
            })
          ];
      });
    }
  }
  // city 修改操作
  public cityUpdate(e): void {
    if (e.saving) {
      let i = null;
      const obj = this.cityUpdateData;
      for (const prop in obj) {
        if (e.value.hasOwnProperty(prop) ) {
          this.cityUpdateData[prop] = e.value[prop];
        }
      }
      if (!(isNaN(e.value.provinceName)) || !(e.value.provinceName === 'null')) {
        i = e.value.provinceName;
        this.cityUpdateData.provinceName = this.provinceList[i].provinceName;
        this.cityUpdateData.provinceCode = this.provinceList[i].provinceCode;
      }
      this.cityLoading = true;
      this.regionSrv.regionCityUpdate(this.cityUpdateData).subscribe(
        (val) => {
          this.cityLoading = false;
          this.cityAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.cityListInit(this.cityPage);
        }
      );
    }
    else {
      this.cityUpdateData = e.value;
      if (this.cityUpdateData.hasOwnProperty('udt')) {
        delete this.cityUpdateData.udt;
      }
      this.smartPublicSrv.areaTreeSelect().subscribe(
        (val) => {
          this.provinceList = val.data.contents;
          this.cityFields = [
            new Textbox({
              value: `${e.value.cityName}`,
              label: '市名称',
              placeholder: '请输入市名称',
              key: 'cityName',
              required: true,
            }),
            new Textbox({
              value: `${e.value.cityCode}`,
              label: '市编号',
              placeholder: '请输入市编号',
              key: 'cityCode',
              required: true,
            }),
            new Dropdownbox({
              value: `${e.value.provinceName}`,
              placeholder: '下拉选择省份...',
              list: val.data.contents,
              label: '请选择所属省:',
              key: 'provinceName',
              optionName: 'provinceName'
            }),
          ];
        });
    }
  }
}
