import {FieldBase} from './field-base';

export class Treebox extends FieldBase<string> {
  controlType = 'treebox';
  constructor(options: {} = {}) {
    super(options);
  }
}
