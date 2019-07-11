import {FieldBase} from './field-base';

export class Dropdownbox extends FieldBase<string> {
  controlType = 'dropdownbox';
  list: Array<any>;

  constructor(options: {} = {}) {
    super(options);
    this.list = options['list'] || '';
  }
}
