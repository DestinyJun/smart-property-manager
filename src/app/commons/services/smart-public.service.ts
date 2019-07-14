import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartPublicService {

  constructor(
    private orgHttp: HttpClient
  ) { }
  // 省级列表查询
  public provinceSelect(params): Observable<any> {
    return this.orgHttp.post('/province/findByPage', params);
  }
  // 根据省级code查询市级
  public citySelect(params): Observable<any> {
    return this.orgHttp.post('/zoning/findByProvinceCode', params);
  }
  // 根据市级code查询县级
  public countySelect(params): Observable<any> {
    return this.orgHttp.post('/zoning/findByCityCode', params);
  }
}
