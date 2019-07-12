import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

export class SmartInterceptor implements HttpInterceptor {
  public clonedRequest: any;
  public skipUrl = [
    `/login`, '/wx/getOauth', '/wx/userinfo',
    '/wx/gettoken', '/imageFileUpload',
    '/wx/getticket', '/member/signin', '/member/recommenderWorkId',
    '/member/sendSMS', '/member/verifySMS'
  ];
  constructor (
    private router: Router
  ) {}
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
        url: environment.http_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
          .set('appkey', environment.appkey)
      });
    }
    return next.handle(this.clonedRequest).pipe(
      tap(
        (event: any) => {
          if (event.status === 200) {
            if (event.body.status === '1000') {
              return of(event);
            }
            this.router.navigate(['/login']);
            return EMPTY;
          }
        },
         (err) => {
          this.router.navigate(['/login']);
          return EMPTY;
        }
      )
    );
  }
  // is skip url
  public isSkipUrl(url: string) {
    if (url === '/imageFileUpload') {
      return '1';
    }
    return this.skipUrl.includes(url);
  }
}
