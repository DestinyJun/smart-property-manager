import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private orgHttp: HttpClient,
  ) { }
  // city 相关接口
  public regionCitySearch(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/city/findByPage', params);
  }
  public regionCityAdd(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/city/add', params);
  }
  public regionCityDelete(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/city/deleteByIds', params);
  }
  public regionCityUpdate(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/city/update', params);
  }
  // county相关接口
  public regionCountySearch(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/district/findByPage', params);
  }
  public regionCountyAdd(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/district/add', params);
  }
  public regionCountyDelete(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/district/deleteByIds', params);
  }
  public regionCountyUpdate(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/district/update', params);
  }
  // community相关接口
  public regionCommunitySearch(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/village/findByPage', params);
  }
  public regionCommunityAdd(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/village/add', params);
  }
  public regionCommunityDelete(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/village/deleteByIds', params);
  }
  public regionCommunityUpdate(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/village/update', params);
  }

}
