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
    return this.orgHttp.post('/divison/choosePid', {});
  }
  public areaTreeAdd(params): Observable<any> {
    return this.orgHttp.post('/divison/add', params);
  }
  public areaTreeDelete(params): Observable<any> {
    return this.orgHttp.post('/divison/deleteByIds', params);
  }
  public areaTreeUpdate(params): Observable<any> {
    return this.orgHttp.post('/divison/update', params);
  }
}
