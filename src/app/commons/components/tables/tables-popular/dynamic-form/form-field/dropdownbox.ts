import {FieldBase} from './field-base';

export class Dropdownbox extends FieldBase<string> {
  controlType = 'dropdownbox';
  list: Array<any>;
  optionName: string;
  linkage: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.list = options['list'] || '';
    this.optionName = options['optionName'] || '';
    this.linkage = options['linkage'] || false;
  }
}
