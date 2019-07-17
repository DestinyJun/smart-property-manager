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
  constructor() {
  }

  ngOnInit() {}
  public onInput(e): void {
    if (this.field['linkage']) {
      this.linkage.emit({value: this.field['list'][e.target.value], type: this.field['linkageType']});
    }
  }
}
