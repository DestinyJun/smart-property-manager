import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TextArea, Textbox, FieldBase} from './dynamic-form/form-field';
import {Dropdownbox} from './dynamic-form/form-field/dropdownbox';
import {Radiosbox} from './dynamic-form/form-field/radiosbox';

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
  @Input() totalItems: number = 64;
  @Input() itemsPerPage: number = 10;
  @Input() modalTitle: any = '基础字段添加';
  @ViewChild('successModal', {static: false}) public successModal: ModalDirective;
  currentPage: number = 4;
  public ids: any = [];
  public check_status = [];
  // form
  public form: FormGroup;
  public formErrors = {
    'email': '',
    'password': '',
    'confirmPassword': '',
    'formError': '',
    'vcode': ''
  };
  public validationMessages = {
    'email': {
      'required': '邮箱必须输入。',
      'pattern': '请输入正确的邮箱地址。'
    },
    'password': {
      'required': '密码必须输入。',
      'minlength': '密码至少要8位。'
    },
    'confirmPassword': {
      'required': '重复密码必须输入。',
      'minlength': '密码至少要8位。',
      'validateEqual': '两次输入的密码不一致。'
    }
  };
  @Input() fields: FieldBase<any>[] = [
    new Textbox({
      label: '头像:',
      placeholder: '上传头像',
      type: 'file',
      key: 'upload'
    }),
    new Textbox({
      label: '用户名:',
      placeholder: '用户名',
      key: 'username'
    }),
    new Textbox({
      label: '常用邮箱:',
      placeholder: '常用邮箱',
      key: 'email'
    }),
    new Textbox({
      label: '密码:',
      type: 'password',
      placeholder: '密码，至少8位',
      key: 'password'
    }),
    new Textbox({
      label: '重复密码:',
      type: 'password',
      placeholder: '重复密码',
      key: 'fireword'
    }),
    new TextArea({
      value: '还是到付哈是否',
      label: '个人简介:',
      placeholder: '个人简介，最多140字，不能放链接。',
      rows: 3,
      key: 'intro'
    }),
    new Dropdownbox({
      value: 1,
      list: [{name: '公司1', id: 1}, {name: '公司2', id: 2}],
      label: '请选择组织:',
      key: 'origami'
    }),
    new Radiosbox({
      value: 0,
      list: [{name: '是', type: 1}, {name: '否', type: 0}],
      label: '是否是收费:',
      key: 'money'
    })
  ];

  constructor() {
  }

  ngOnInit() {
    this.form = this.toFormGroup(this.fields);
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    this.tbody.map(() => {
      this.check_status.push(false);
    });
  }

  public addClick() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.successModal.hide();
    } else {
      console.log('表单有不合格项');
    }
  }

  public upDateClick() {
  }
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
  public pageChanged(event: any): void {
    // console.log(this.currentPage);
    this.currentPage = event.page;
    console.log('当前页为第: ' + event.page + '页');
    console.log('每页数量： ' + event.itemsPerPage + '条');
  }
  public toFormGroup(fields: FieldBase<any>[]) {
    const group: any = {};
    fields.forEach(field => {
      if (field.key === 'password') {
        group[field.key] = new FormControl(field.value || '', Validators.required);
      } else {
        group[field.key] = new FormControl(field.value || '');
      }
    });
    return new FormGroup(group);
  }
  public onValueChanged(data?: any) {
    if (!this.form) {
      return;
    }
    const form = this.form;
    for (const field in this.formErrors) {
      if (this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if ( control.errors) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
