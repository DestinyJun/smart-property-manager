import {FieldBase} from './field-base';

export class Textbox extends FieldBase<string> {
  controlType = 'textbox';
  type: string; // 表单类型

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
