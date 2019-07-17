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
  // province 相关接口
  public regionProvinceSearch(params): Observable<any> {
    return this.orgHttp.post('/province/findByPage', params);
  }
  public regionProvinceAdd(params): Observable<any> {
    return this.orgHttp.post('/province/add', params);
  }
  public regionProvinceDelete(params): Observable<any> {
    return this.orgHttp.post('/province/deleteByIds', params);
  }
  public regionProvinceUpdate(params): Observable<any> {
    return this.orgHttp.post('/province/update', params);
  }
  // city 相关接口
  public regionCitySearch(params): Observable<any> {
    return this.orgHttp.post('/city/findByPage', params);
  }
  public regionCityAdd(params): Observable<any> {
    return this.orgHttp.post('/city/add', params);
  }
  public regionCityDelete(params): Observable<any> {
    return this.orgHttp.post('/city/deleteByIds', params);
  }
  public regionCityUpdate(params): Observable<any> {
    return this.orgHttp.post('/city/update', params);
  }
  // county相关接口
  public regionCountySearch(params): Observable<any> {
    return this.orgHttp.post('/district/findByPage', params);
  }
  public regionCountyAdd(params): Observable<any> {
    return this.orgHttp.post('/district/add', params);
  }
  public regionCountyDelete(params): Observable<any> {
    return this.orgHttp.post('/district/deleteByIds', params);
  }
  public regionCountyUpdate(params): Observable<any> {
    return this.orgHttp.post('/district/update', params);
  }
  // community相关接口
  public regionCommunitySearch(params): Observable<any> {
    return this.orgHttp.post('/village/findByPage', params);
  }
  public regionCommunityAdd(params): Observable<any> {
    return this.orgHttp.post('/village/add', params);
  }
  public regionCommunityDelete(params): Observable<any> {
    return this.orgHttp.post('/village/deleteByIds', params);
  }
  public regionCommunityUpdate(params): Observable<any> {
    return this.orgHttp.post('/village/update', params);
  }

}
