import {FieldBase} from './field-base';

export class Dropdownbox extends FieldBase<string> {
  controlType = 'dropdownbox';
  list: Array<any>;
  optionName: string;

  constructor(options: {} = {}) {
    super(options);
    this.list = options['list'] || '';
    this.optionName = options['optionName'] || '';
  }
}
