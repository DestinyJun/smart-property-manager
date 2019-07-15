import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FieldBase} from './dynamic-form/form-field';

@Component({
  selector: 'app-tables-popular',
  templateUrl: './tables-popular.component.html',
  styleUrls: ['./tables-popular.component.scss']
})
export class TablesPopularComponent implements OnInit, OnChanges{
  @Input() thead: any = [
    {theadName: '姓名', theadLabel: 'username'},
    {theadName: '日期', theadLabel: 'date'},
    {theadName: '角色', theadLabel: 'role'},
    {theadName: '状态', theadLabel: 'status'}
  ];
  @Input() tbody: any = [
    {username: 'Samppa Nori', id: 1, date: '2012/01/01', role: 'Member', status: 'Active'},
    {username: '哈哈哈', id: 2, date: '2012/01/01', role: 'Member', status: 'Active'},
    {id: 5, username: 'Samppa Nori', date: '2012/01/01', role: 'Member', status: 'Active'},
  ];
  @Input() modalTitle: any = '基础字段添加';
  @Input() updateTitle: any = '基础字段修改';
  @Input() fields: FieldBase<any>[] = [
   /* new Textbox({
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
    })*/
  ];
  @Output() pageChange = new EventEmitter();
  @Output() deleteChange = new EventEmitter();
  @Output() addChange = new EventEmitter();
  @Output() updateChange = new EventEmitter();
  @ViewChild('successModal', {static: false}) public successModal: ModalDirective;
  @ViewChild('primaryModal', {static: false}) public primaryModal: ModalDirective;
  @ViewChild('dangerModal', {static: false}) public dangerModal: ModalDirective;
  public ids = [];
  public check_status = [];
  public tablesAlertsDis: any = [];
  // form
  public form: FormGroup;
  public formErrors = {};
  public validationMessages: any = {
    /*'email': {
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
    }*/
  };
  constructor() {
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.fields) {
      this.form = this.toFormGroup(this.fields);
      this.form.valueChanges.subscribe((data) => this.onValueChanged(data));
      this.onValueChanged();
    }
    if (this.tbody) {
     this.ids = [];
     this.tableInit();
     this.validationInit();
    }
  }
  // table初始化
  public tableInit(): void {
    this.check_status = [];
    this.tbody.map(() => {
      this.check_status.push(false);
    });
  }
  // add按钮事件
  public addShowModal(): void {
    this.successModal.show();
    this.addChange.emit(false);
  }
  public addSaveClick() {
    if (this.form.valid) {
      this.successModal.hide();
      this.addChange.emit(this.form.value);
      this.form.reset();
    }
  }
  // update事件
  public updateShowModal(): void{
    if (this.ids.length !== 1) {
      this.tablesAlertsDis.push({
        type: 'danger',
        msg: `操作有误，请选择一项进行操作！`,
        timeout: 2000
      });
      return;
    }
    this.primaryModal.show();
    this.updateChange.emit({saving: false, value: this.cloneObj(this.tbody[this.ids[0]])});
  }
  public upDateSaveClick() {
    if (this.form.valid) {
      this.primaryModal.hide();
      this.updateChange.emit({saving: true, value: this.form.value});
      this.form.reset();
    }
  }
  // delete事件
  public deleteShowModal(): void {
    if (this.ids.length <= 0) {
      this.tablesAlertsDis.push({
        type: 'danger',
        msg: `操作有误，请选择一项或多项进行操作！`,
        timeout: 2000
      });
      return;
    }
    this.dangerModal.show();
  }
  public deleteSaveClick() {
    const arr = [];
    this.ids.map((val) => {
      arr.push(this.tbody[val].id);
    });
    this.deleteChange.emit(arr);
    this.dangerModal.hide();
  }
  // table 选择
  public theadOnInput(e) {
    this.ids = [];
    this.check_status = [];
    if (e.target.checked) {
      this.tbody.map((val, index) => {
        this.check_status.push(true);
        // this.ids.push(val.id);
        this.ids.push(index);
      });
    } else {
      this.tbody.map(() => {
        this.check_status.push(false);
      });
      this.ids = [];
    }
  }
  public tbodyOnInput(e, i) {
    if (e.target.checked) {
      this.check_status[i] = true;
      this.ids.push(i);
    } else {
      this.check_status[i] = false;
      const set = new Set(this.ids);
      set.delete(i);
      this.ids = Array.from(set);
    }
  }
  // 表单初始化及动态校验
  public toFormGroup(fields: FieldBase<any>[]) {
    const group: any = {};
    fields.forEach(field => {
      if (field.disabled) {
        group[field.key] = new FormControl({value: field.value || '', disabled: true});
      } else {
        group[field.key] = new FormControl({value: field.value || '', disabled: false});
      }
      if (field.required) {
        group[field.key].validator = Validators.required;
      }
    });
    return new FormGroup(group);
  }
  public validationInit(): void {
    this.formErrors = {};
    this.validationMessages = {};
    this.fields.map((val) => {
      const a = {};
      this.formErrors[val.key] = '';
      if (val.required) {
        a['required'] = `${val.label}是必填项`;
        this.validationMessages[val.key] = a;
      }
    });
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
  // 遍历赋值操作
  public cloneObj(c: any): any {
    const obj = {};
    for (const prop in c) {
      if (c.hasOwnProperty(prop) ) {
        obj[prop] = c[prop];
      }
    }
    return obj;
  }
}
