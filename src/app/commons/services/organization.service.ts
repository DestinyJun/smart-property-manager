import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  // 组织管理相关接口
  public orgAgencyAdd(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/organization/add', params);
  }
  public orgAgencyDelete(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/organization/deleteByIds', params);
  }
  public orgAgencyUpdate(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/organization/deleteByIds', params);
  }
  // 部门管理相关接口
  public orgDepartmentAdd(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/department/add', params);
  }
  public orgDepartmentDelete(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/department/deleteByIds', params);
  }
  public orgDepartmentUpdate(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/department/update', params);
  }
}
