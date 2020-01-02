export class FieldBase<T> {
  value: T; // 默认值
  key: string; // 返回对象的key
  label: string; // label标签的说明
  controlType: string; // 表单的类型
  parent: string; // 在树形结构中key的取值字段
  placeholder: string; // placeholders说明
  required?: boolean;// 是否必填
  disabled?: boolean;// 是否是必须参数
  hidden?: boolean;// 是否隐藏

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    disabled?: boolean,
    hidden?: boolean,
    order?: number,
    controlType?: string,
    placeholder?: string,
    parent?: string,
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.controlType = options.controlType || '';
    this.placeholder = options.placeholder || '';
    this.required = options.required || false;
    this.disabled = options.disabled || false;
    this.hidden = options.hidden || false;
    this.parent = options.parent || '';
  }
}
