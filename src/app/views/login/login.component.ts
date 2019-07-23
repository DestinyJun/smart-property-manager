import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../commons/services/global.service';
import {Router} from '@angular/router';
export class RegisterModel {
  username: string;
  password: string;
  module = 'CLOUD_HOUSE_WEB';
}
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
  public regModel: RegisterModel = new RegisterModel();
  public loginLoading = false;
  public loginMsg: any = null;
  constructor (
    private httpClient: HttpClient,
    private globalSrv: GlobalService,
    private router: Router,
  ) {}
  ngOnInit(): void {
  }
  // 登陆逻辑
  public doLogin(): void {
    this.loginLoading = true;
    this.httpClient.post('/cloud_house_authentication/login', this.regModel).subscribe(
      (val) => {
        this.loginLoading = false;
        if (val['status'] != 1000) {
          this.loginMsg = val;
          return;
        }
        this.globalSrv.smartSessionSetObject('appkey', val['data'].token);
        this.router.navigate(['/home']);
      }
    );
  }
  // form获得焦点事件
  public onFocus(): void {
    this.loginMsg = null;
  }
}
