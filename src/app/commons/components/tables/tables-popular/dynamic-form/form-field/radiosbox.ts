import {FieldBase} from './field-base';

export class Radiosbox extends FieldBase<string> {
  controlType = 'radiosbox';
  list: Array<any>;

  constructor(options: {} = {}) {
    super(options);
    this.list = options['list'] || '';
  }
}
