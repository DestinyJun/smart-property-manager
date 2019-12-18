import { Component, OnInit } from '@angular/core';
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
  `,
})
export class AppComponent implements OnInit {
  public showLoading: Observable<Boolean>;
  public count: Observable<Number>;
  constructor(
    private router: Router,
    private store: Store<{  count: Number, showLoading: boolean }>) {
    this.showLoading = store.pipe(select('showLoading'));
    this.count = store.pipe(select('count'));
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
