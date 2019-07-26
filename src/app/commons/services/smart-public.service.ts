import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmartPublicService {

  constructor(
    private httpClient: HttpClient
  ) { }
  /******************************联动接口*************************/
  // 查询区域树
  public areaTreeSelect(): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/divison/choosePid', {});
  }
  // 组织树查询
  public orgTreeSelect(): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/organization/choosePid', {});
  }
  // 部门树查询
  public departmentTreeSelect(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/department/choosePid', params);
  }
}
