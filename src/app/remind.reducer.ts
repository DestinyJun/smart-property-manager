import {Action, createReducer, on} from '@ngrx/store';
import { remindChange } from './counter.actions';

interface State  {
  type: string,
  msg: string;
  timeout: number;
}
export const remindText: State = {
  type: '0',
  msg: '',
  timeout: 0,
};
const _remindReducer = createReducer(remindText,
  on(remindChange, (state, action) => ({type: action.data.type,msg: action.data.msg,timeout: action.data.timeout})),
);

// @ts-ignore
export function RemindReducer(state: State, action: Action) {
  return _remindReducer(state, action);
}
