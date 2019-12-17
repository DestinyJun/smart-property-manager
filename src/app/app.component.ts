import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
    <!--<ngx-loading [show]="loadingShow" [config]="{backdropBorderRadius: '3px'}"></ngx-loading>-->
  `
})
export class AppComponent implements OnInit {
  public loadingShow = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
