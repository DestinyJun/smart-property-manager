import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

export class SmartInterceptor implements HttpInterceptor {
  public clonedRequest: any;
  public skipUrl = [
    `/login`, '/wx/getOauth', '/wx/userinfo',
    '/wx/gettoken', '/imageFileUpload',
    '/wx/getticket', '/member/signin', '/member/recommenderWorkId',
    '/member/sendSMS', '/member/verifySMS'
  ];
  constructor () {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.debug_http(req, next);
  }
  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isSkipUrl(req.url)) {
      this.clonedRequest = req.clone({
        url: environment.http_url,
        headers: req.headers
          .set('Content-type', 'application/json')
      });
    }
    else {
      this.clonedRequest = req.clone({
        url: environment.http_url,
        headers: req.headers
          .set('Content-type', 'application/json')
          .set('appkey', environment.appkey)
      });
    }
    return next.handle(this.clonedRequest);
  }
  // is skip url
  public isSkipUrl(url: string) {
    if (url === '/imageFileUpload') {
      return '1';
    }
    return this.skipUrl.includes(url);
  }
}
