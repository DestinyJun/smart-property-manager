import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(
    private orgHttp: HttpClient,
  ) { }
  public orgPageSearch(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/organization/findByPage', params);
  }
  public orgDelete(params): Observable<any> {
    return this.orgHttp.post('/cloud_house_admin/organization/deleteByIds', params);
  }
}
