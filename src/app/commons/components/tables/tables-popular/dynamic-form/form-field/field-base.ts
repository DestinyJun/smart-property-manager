export class FieldBase<T> {
  value: T;
  key: string;
  label: string;
  controlType: string;
  parent: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;

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
