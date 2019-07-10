import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tables-popular',
  templateUrl: './tables-popular.component.html',
  styleUrls: ['./tables-popular.component.scss']
})
export class TablesPopularComponent implements OnInit {
  @Input() thead: any = [
    {theadName: '姓名', theadLabel: 'username'},
    {theadName: '日期', theadLabel: 'date'},
    {theadName: '角色', theadLabel: 'role'},
    {theadName: '状态', theadLabel: 'status'}
    ];
  @Input() tbody: any = [
    {id: 1, username: 'Samppa Nori', date: '2012/01/01', role: 'Member', status: 'Active'},
    {id: 2, username: 'Samppa Nori', date: '2012/01/01', role: 'Member', status: 'Active'},
    {id: 5, username: 'Samppa Nori', date: '2012/01/01', role: 'Member', status: 'Active'},
  ];
  public ids: any = [];
  public check_status = [];
  constructor() { }

  ngOnInit() {
    this.tbody.map(() => {
      this.check_status.push(false);
    });
  }
  public addClick() {}
  public upDateClick() {}
  public deleteClick() {
    console.log(this.ids);
  }
  public theadOnInput(e) {
    this.ids = [];
    this.check_status = [];
    if (e.target.checked) {
      this.tbody.map((val) => {
        this.check_status.push(true);
        this.ids.push(val.id);
      });
    } else {
      this.tbody.map((val) => {
        this.check_status.push(false);
      });
      this.ids = [];
    }
  }
  public tbodyOnInput(e, i) {
    if (e.target.checked) {
      this.check_status[i] = true;
      this.ids.push(this.tbody[i].id);
    } else {
      this.check_status[i] = false;
      const set = new Set(this.ids);
      set.delete(this.tbody[i].id);
      this.ids = Array.from(set);
    }
  }
}
