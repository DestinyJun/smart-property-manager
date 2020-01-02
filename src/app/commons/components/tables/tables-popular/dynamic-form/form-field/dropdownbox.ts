import {FieldBase} from './field-base';
import {SelectList} from '../../../../api';

export class Dropdownbox extends FieldBase<string> {
  controlType = 'dropdownbox';
  list: Array<SelectList>; // 下拉列表的选择项
  optionName: string; // option显示的名称字段
  optionValue: string; // option的value值的字段
  // linkage: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.list = options['list'] || [];
    this.optionName = options['optionName'] || '';
    this.optionValue = options['optionValue'] || '';
    // this.linkage = options['linkage'] || false;
  }
}
