import {FieldBase} from './field-base';

export class Treebox extends FieldBase<string> {
  controlType = 'treebox'; // 类型
  treeType: string; // 树形结构的区分字段，如区域树还是组织树
  constructor(options: {} = {}) {
    super(options);
    this.treeType = options['treeType'] || '';
  }
}
