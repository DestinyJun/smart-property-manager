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
}
