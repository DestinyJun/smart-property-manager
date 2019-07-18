import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldBase} from './form-field';

@Component({
  selector: 'app-form-control',
  templateUrl: 'form-control.component.html'
})
export class FormControlComponent implements OnInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  @Input() formErrors: any;
  @Output() linkage = new EventEmitter();
  @Output() inputChange = new EventEmitter();
  @Output() treeSelected = new EventEmitter();
  constructor() {
  }

  ngOnInit() {}
  public onInput(e, field): void {
    this.inputChange.emit({value: e.target.value, obj: field});
  }
  public treeShow(e): void {
    this.treeSelected.emit(e);
  }
}
