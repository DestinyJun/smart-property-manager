import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-field',
  templateUrl: './setting-field.component.html',
  styleUrls: ['./setting-field.component.scss']
})
export class SettingFieldComponent implements OnInit {
  public setting_body = [
    {}
  ];
  constructor() { }

  ngOnInit() {
  }

}
