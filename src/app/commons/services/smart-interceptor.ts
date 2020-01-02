import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {catchError, delay, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {GlobalService} from './global.service';
import {Store} from '@ngrx/store';
import {loadingHiddenChange, loadingShowChange, remindChange} from '../../counter.actions';

export class SmartInterceptor implements HttpInterceptor {
  public clonedRequest: any;
  public http_url: any;
  public skipUrl = [`/cloud_house_authentication/login`];
  public skipState = [ `1000`];
  constructor (
    private router: Router,
    private globalSrv: GlobalService,
    private store: Store<{  count: Number, showLoading: boolean, remindText: Array<any> }>
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('cloud_house_authentication') < 0) {
      this.http_url = environment.house_admin_url;
    }
    else {
      this.http_url = environment.house_authentication_url;
    }
    if (environment.production) {
      return this.prod_http(req, next);
    } else {
      return this.debug_http(req, next);
    }
  }
  public prod_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isSkipUrl(req.url)) {
      this.clonedRequest = req.clone({
        url: this.http_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
      });
    }
    else {
      if (!(this.globalSrv.smartSessionGetObject('appkey'))) {
        this.router.navigate(['/error']);
        return EMPTY;
      }
      this.clonedRequest = req.clone({
        url: this.http_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
          .set('appkey', this.globalSrv.smartSessionGetObject('appkey'))
      });
    }
    return next.handle(this.clonedRequest).pipe(
      delay(300),
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
  public debug_http(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(loadingShowChange());
    if (this.isSkipUrl(req.url)) {
      this.clonedRequest = req.clone({
        url: this.http_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
      });
    }
    else {
      this.clonedRequest = req.clone({
        url: this.http_url + req.url,
        headers: req.headers
          .set('Content-type', 'application/json')
          .set('appkey', this.globalSrv.smartSessionGetObject('appkey'))
      });
    }
    return next.handle(this.clonedRequest).pipe(
      // delay(300), // 定义延时请求
      tap((event: any) => {
          this.store.dispatch(loadingHiddenChange());
          if (event.status === 200) {
            if (this.skipState.includes(event.body.status)) {
              this.store.dispatch(remindChange({data:{
                  type: 'success',
                  msg: `${event.body.message}(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
                  timeout: 3000
                }}));
              return of(event);
            } else {
              throw event.body;
            }
          } else if (event.status === 500) {
            this.store.dispatch(remindChange({data:{
                type: 'success',
                msg: `服务器处理失败，请检查网络或联系管理员！(操作时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
                timeout: 3000
              }}));
            return EMPTY;
          }
        }),
      catchError((error: any) => {
        this.store.dispatch(loadingHiddenChange());
        this.store.dispatch(remindChange({data:{
            type: 'danger',
            msg: `错误码：${error.status}；错误信息：${error.message}(异常时间: ${new Date().toLocaleTimeString('it-IT', {hour12: false})})`,
            timeout: 5000
          }}));
        // this.router.navigate(['/login']);
        return EMPTY;
        // return throwError(error);
      })
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
