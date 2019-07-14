import {Component, OnInit, Input, OnChanges} from '@angular/core';
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
  constructor() {
  }

  ngOnInit() {}
}
