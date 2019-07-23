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
  // table list
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
  // tree list
  @Input() treeList: any;
  @Input() tableType: any = 'table';
  // modal
  @Input() modalTitle: any = '基础字段添加';
  @Input() modalTreeTitle: any = '请选择区域树';
  @Input() modalTreeList: any = [];
  @Input() updateTitle: any = '基础字段修改';
  // operating
  @Input() fields: FieldBase<any>[] = [];
  @Output() deleteChange = new EventEmitter();
  @Output() addChange = new EventEmitter();
  @Output() updateChange = new EventEmitter();
  @Output() linkageChange = new EventEmitter();
  @ViewChild('successModal', {static: false}) public successModal: ModalDirective;
  @ViewChild('primaryModal', {static: false}) public primaryModal: ModalDirective;
  @ViewChild('dangerModal', {static: false}) public dangerModal: ModalDirective;
  @ViewChild('warningModal', {static: false}) public warningModal: ModalDirective;
  public ids = [];
  public check_status = [];
  public tablesAlertsDis: any = [];
  // form
  public form: FormGroup;
  public formErrors = {};
  public treeSelectInput: any;
  public treeSelectValue: any;
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
      this.form.valueChanges.subscribe((data) => {
        this.onValueChanged(data);
      });
      this.onValueChanged();
    }
    if (this.tbody) {
      this.ids = [];
      this.tableInit();
      this.validationInit();
    }
    if (this.modalTreeList) {
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
    if (this.tableType === 'table') {
      if (this.ids.length !== 1) {
        this.tablesAlertsDis.push({
          type: 'danger',
          msg: `操作有误，请选择一项进行操作！`,
          timeout: 2000
        });
        return;
      }
      this.updateChange.emit({saving: false, value: this.cloneObj(this.tbody[this.ids[0]])});
    }
    else {
      this.updateChange.emit({saving: false, value: this.treeSelectValue});
    }
    this.primaryModal.show();
  }
  public upDateSaveClick() {
    if (this.form.valid) {
      this.updateChange.emit({saving: true, value: this.form.value});
      this.form.reset();
      this.primaryModal.hide();
    }
  }
  // delete事件
  public deleteShowModal(): void {
    if (this.tableType === 'table') {
      if (this.ids.length <= 0) {
        this.tablesAlertsDis.push({
          type: 'danger',
          msg: `操作有误，请选择一项或多项进行操作！`,
          timeout: 2000
        });
        return;
      }
    }
    this.dangerModal.show();
  }
  public deleteSaveClick() {
    if (this.tableType === 'table') {
      const arr = [];
      this.ids.map((val) => {
        arr.push(this.tbody[val].id);
      });
      this.deleteChange.emit(arr);
    } else {
      this.deleteChange.emit( this.treeSelectValue);
    }
    this.dangerModal.hide();
  }
  // table 选择
  public theadOnInput(e) {
    this.ids = [];
    this.check_status = [];
    if (e.target.checked) {
      this.tbody.map((val, index) => {
        this.check_status.push(true);
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
  /*// 数据联动
  public onInputChange(e): void {
    this.fields.map((val, index) => {
      if (val.key === e.obj.key) {
        this.fields[index].value = e.value;
      }
    });
    this.form = this.toFormGroup(this.fields);
  }*/
  // tree数据初始化
  public onTreeSelected(e): void {
    this.treeSelectValue = e;
  }
  public treeSelectSave(): void {
    this.fields.map((val, index) => {
      const a = {};
      if (val.controlType === this.treeSelectInput.controlType) {
       for (const prop in this.fields[index]) {
         if (this.fields[index].hasOwnProperty(prop)) {
           if (prop === 'key') {
             a[this.fields[index][prop]] = this.treeSelectValue[this.fields[index]['parent']];
             this.form.patchValue(a);
           }
         }
       }
     }
   });
  }
  public onInputTreeSelected(e): void {
    this.treeSelectInput = e;
    this.warningModal.show();
  }
}
