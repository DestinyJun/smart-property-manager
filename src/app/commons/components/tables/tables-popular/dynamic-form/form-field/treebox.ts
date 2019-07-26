import {FieldBase} from './field-base';

export class Treebox extends FieldBase<string> {
  controlType = 'treebox';
  treeType: string;
  constructor(options: {} = {}) {
    super(options);
    this.treeType = options['treeType'] || '';
  }
}
