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
  /******************************联动接口*************************/
  // 查询区域树
  public areaTreeSelect(): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/divison/choosePid', {});
  }
  public areaTreeAdd(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/divison/add', params);
  }
  public areaTreeDelete(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/divison/deleteByIds', params);
  }
  public areaTreeUpdate(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/divison/update', params);
  }
  // 组织树查询
  public orgTreeSelect(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/organization/choosePid', params);
  }
}
