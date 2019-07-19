import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private orgHttp: HttpClient,
  ) { }
  // role 相关接口
  public permisRoleSearch(params): Observable<any> {
    return this.orgHttp.post('/role/admin/findByPage', params);
  }
  public permisRoleAdd(params): Observable<any> {
    return this.orgHttp.post('/role/admin/add', params);
  }
  public permisRoleDelete(params): Observable<any> {
    return this.orgHttp.post('/role/deleteByIds', params);
  }
  public permisRoleUpdate(params): Observable<any> {
    return this.orgHttp.post('/role/update', params);
  }
  // permis manger 相关接口
  public permisMangerSearch(params): Observable<any> {
    return this.orgHttp.post('/permit/config/admin/findPermitAll', params);
  }
  public permisMangerAdd(params): Observable<any> {
    return this.orgHttp.post('/permit/add', params);
  }
  public permisMangerDelete(params): Observable<any> {
    return this.orgHttp.post('/permit/deletePermitByPermitCodes', params);
  }
  public permisMangerUpdate(params): Observable<any> {
    return this.orgHttp.post('/permit/update', params);
  }
}
