import {Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, AfterViewInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldBase} from './form-field';

@Component({
  selector: 'app-form-control',
  templateUrl: 'form-control.component.html'
})
export class FormControlComponent  implements OnInit, OnChanges, AfterViewInit {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  @Input() formErrors: any;
  @Output() linkage = new EventEmitter();
  @Output() inputChange = new EventEmitter();
  @Output() treeSelected = new EventEmitter();
  @ViewChild ('dropdownbox', {static: false}) dropdownbox;
  constructor() {
  }

  ngOnInit() {}
  ngOnChanges(event: SimpleChanges): void {}
  ngAfterViewInit(): void {
    if (this.field.controlType === 'dropdownbox') {
      if (this.field['list'].length !== 0) {
        const dropdownbox = this.dropdownbox.nativeElement.children;
        for (let i = 0; i < dropdownbox.length; i++) {
          if (dropdownbox[i].value === this.field.value){
            dropdownbox[i].selected = true;
          }
        }
      }
    }
  }
  public onInput(e, field): void {
    this.inputChange.emit({value: e.target.value, obj: field});
  }
  public treeShow(e): void {
    this.treeSelected.emit(e);
  }

}
