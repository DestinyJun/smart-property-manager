import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
    <style>
      .loading{
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        background: rgba(12,12,12,0.3);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <div class="loading" [hidden]="showLoading | async">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <app-smart-alert [alertsDismiss]="remindText"></app-smart-alert>
  `,
})
export class AppComponent implements OnInit,AfterViewInit {
  public showLoading: Observable<Boolean>;
  public remindText = [];
  public count: Observable<Number>;
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private store: Store<{  count: Number, showLoading: boolean, remindText: Array<any> }>) {
    this.showLoading = store.pipe(select('showLoading'));
    this.count = store.pipe(select('count'));
    store.pipe(select('remindText')).subscribe((val) => {
      setTimeout(() => {
        this.remindText.push(val)
      },50);
    })
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
