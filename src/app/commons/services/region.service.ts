import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(
    private httpClient: HttpClient,
  ) { }
  public regionTreeAdd(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/divison/add', params);
  }
  public regionTreeDelete(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/divison/deleteByIds', params);
  }
  public regionTreeUpdate(params): Observable<any> {
    return this.httpClient.post('/cloud_house_admin/divison/update', params);
  }

}
