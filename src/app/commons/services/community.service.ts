import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  // 新增小区
  public communityAdd(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/village/add', params);
  }

  // 删除小区
  public communityDelete(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/village/deleteByIds', params);
  }

  // 修改小区
  public communityUpdate(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/village/update', params);
  }

  // 查询小区
  public CommunitySearch(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/village/findByPage', params);
  }
}
