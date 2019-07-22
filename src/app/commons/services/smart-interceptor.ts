import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, of} from 'rxjs';
import {delay, finalize, tap, timeout} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

export class SmartInterceptor implements HttpInterceptor {
  public clonedRequest: any;
  public http_url: any;
  public skipUrl = [`/login`];
  public skipState = [ `1000`, `1005`];
  constructor (
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('cloud_house_authentication') < 0) {
      this.http_url = environment.house_admin_url;
    } else {
      this.http_url = environment.house_authentication_url;
    }
    return this.debug_http(req, next);
  }
  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isSkipUrl(req.url)) {
      this.clonedRequest = req.clone({
        url: this.http_url,
        headers: req.headers
          .set('Content-type', 'application/json')
      });
    }
    else {
      this.clonedRequest = req.clone({
        url: this.http_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
          .set('appkey', environment.appkey)
      });
    }
    return next.handle(this.clonedRequest).pipe(
      // delay(300),
      tap(
        (event: any) => {
          if (event.status === 200) {
            if (this.skipState.includes(event.body.status)) {
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
