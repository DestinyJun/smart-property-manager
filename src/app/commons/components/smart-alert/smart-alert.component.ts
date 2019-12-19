import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-smart-alert',
  templateUrl: './smart-alert.component.html',
  styleUrls: ['./smart-alert.component.scss']
})
export class SmartAlertComponent implements OnInit {
  @Input() alertsDismiss = {};
  constructor() { }

  ngOnInit() {
  }

}
