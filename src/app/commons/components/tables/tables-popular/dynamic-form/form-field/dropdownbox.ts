import {FieldBase} from './field-base';
import {SelectList} from '../../../../api';

export class Dropdownbox extends FieldBase<string> {
  controlType = 'dropdownbox';
  list: Array<SelectList>;
 /* optionName: string;
  linkage: boolean;*/

  constructor(options: {} = {}) {
    super(options);
    this.list = options['list'] || [];
    /*this.optionName = options['optionName'] || '';
    this.linkage = options['linkage'] || false;*/
  }
}
