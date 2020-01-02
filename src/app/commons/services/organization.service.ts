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

  // 组织添加
  public orgAgencyAdd(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/organization/add', params);
  }

  // 组织删除
  public orgAgencyDelete(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/organization/deleteByIds', params);
  }

  // 组织修改
  public orgAgencyUpdate(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/organization/update', params);
  }

  // 部门添加
  public orgDepartmentAdd(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/department/add', params);
  }

  // 部门删除
  public orgDepartmentDelete(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/department/deleteByIds', params);
  }

  // 部门修改
  public orgDepartmentUpdate(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/department/update', params);
  }

  // 部门查询
  public orgDepartmentSelect(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/department/findByPage', params);
  }
}
