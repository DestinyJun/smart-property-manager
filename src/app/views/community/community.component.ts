import { Component, OnInit } from '@angular/core';
import {FieldBase, Textbox, Image, Dropdownbox} from '../../commons/components/tables/tables-popular/dynamic-form/form-field';
import {RegionService} from '../../commons/services/region.service';

@Component({
  selector: 'app-region-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  public communityList: any;
  public countyList: any;
  public communityPage = {pageNo: '1', pageSize: '10'};
  public communityLoading = false;
  public communityThead = [
    {theadName: '唯一标识', theadLabel: 'id'},
    {theadName: '小区名称', theadLabel: 'villageName'},
    {theadName: '小区编码', theadLabel: 'villageCode'},
    {theadName: '所属公司', theadLabel: 'organizationName'},
    {theadName: '建筑面积', theadLabel: 'constructionArea'},
    {theadName: '绿化面积', theadLabel: 'greeningRate'},
    {theadName: '所属县', theadLabel: 'districtName'},
    {theadName: '创建时间', theadLabel: 'idt'},
    {theadName: '最后修改时间', theadLabel: 'udt'},
  ];
  public communityFields: FieldBase<any>[] = [];
  public communityAlertsDis: any = [];
  public communityUpdateData: any;
  public communityCurrentPage: number = 1;
  constructor(
    private regionSrv: RegionService
  ) { }

  ngOnInit() {
    // this.communityListInit(this.communityPage);
  }
  // community数据初始化
 /* public communityListInit(param): void {
    this.communityLoading = true;
    this.regionSrv.regionCommunitySearch(param).subscribe(
      (val) => {
        console.log(val);
        this.communityLoading = false;
        this.communityList = val.data;
      }
    );
  }*/
  // community分页操作
  // public communityChange(e): void {
  //   this.communityPage.pageNo = e.page;
  //   this.communityListInit(this.communityPage);
  // }
  // community删除操作
  // public communityDelete(e): void {
  //   const arr = [];
  //   e.map((val) => {
  //     arr.push({id: val});
  //   });
  //   this.communityLoading = true;
  //   this.regionSrv.regionCommunityDelete({data: arr}).subscribe(
  //     (val) => {
  //       this.communityLoading = false;
  //       this.communityAlertsDis.push({
  //         type: 'success',
  //         msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
  //         timeout: 2000
  //       });
  //       this.communityListInit(this.communityPage);
  //     }
  //   );
  // }
  // community新增操作
  public communityAdd(e): void {
    console.log(e);
    const i = e;
    if (e) {
     /* this.communityLoading = true;
      this.regionSrv.regionCommunityAdd({
        districtName: e.districtName,
        districtCode: e.districtCode,
        cityName: this.countyList[i].cityName,
        cityCode: this.countyList[i].cityCode,
      }).subscribe(
        (val) => {
          this.communityAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.communityLoading = false;
          this.communityListInit(this.communityPage);
        }
      );*/
    }
    else {
     /* this.regionSrv.regionCountySearch({pageNo: 1, pageSize: 100}).subscribe(
        (val) => {
          console.log(val);
          this.countyList = val.data.contents;
          this.communityFields = [
            new Textbox({
              label: '小区名称',
              placeholder: '请输入小区名称',
              key: 'villageName',
              required: true,
            }),
            new Textbox({
              label: '小区编号',
              placeholder: '请输入小区编号',
              key: 'villageCode',
              required: true,
            }),
            new Textbox({
              label: '总面积',
              placeholder: '请输入总面积',
              key: 'constructionArea',
              required: true,
            }),
            new Textbox({
              label: '绿化率',
              placeholder: '请输入绿化率',
              key: 'greeningRate',
              required: true,
            }),
            new Textbox({
              label: '公共区域面积',
              placeholder: '请输入绿化率',
              key: 'publicArea',
              required: true,
            }),
            new Dropdownbox({
              list: val.data.contents,
              label: '请选择所属组织',
              placeholder: '下拉选择组织...',
              key: 'organizationName ',
              optionName: 'organizationName',
              required: true,
            }),
            new Dropdownbox({
              list: val.data.contents,
              label: '请选择所属县区',
              placeholder: '下拉选择县区...',
              key: 'districtName',
              optionName: 'districtName',
              required: true,
            }),
            new Textbox({
              label: '图片上传',
              placeholder: '上传图片...',
              type: 'file',
              key: 'upload'
            }),
            new Image({
              src: ''
            }),
          ];
        });*/
    }
  }
  // community 修改操作
  /*public communityUpdate(e): void {
    if (e.saving) {
      let i = null;
      const obj = this.communityUpdateData;
      for (const prop in obj) {
        if (e.value.hasOwnProperty(prop) ) {
          this.communityUpdateData[prop] = e.value[prop];
        }
      }
      if (!(isNaN(e.value.cityName)) || !(e.value.cityName === 'null')) {
        i = e.value.cityName;
        this.communityUpdateData.cityName = this.countyList[i].cityName;
        this.communityUpdateData.cityCode = this.countyList[i].cityCode;
      }
      this.communityLoading = true;
      this.regionSrv.regionCommunityUpdate(this.communityUpdateData).subscribe(
        (val) => {
          this.communityLoading = false;
          this.communityAlertsDis.push({
            type: 'success',
            msg: `${val.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 2000
          });
          this.communityListInit(this.communityPage);
        }
      );
    }
    else {
      this.communityUpdateData = e.value;
      if (this.communityUpdateData.hasOwnProperty('udt')) {
        delete this.communityUpdateData.udt;
      }
      this.regionSrv.regionCitySearch({pageNo: 1, pageSize: 100}).subscribe(
        (val) => {
          this.countyList = val.data.contents;
          this.communityFields = [
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
  }*/
}
