import { createReducer, on } from '@ngrx/store';
import { loadingShowChange, loadingHiddenChange } from './counter.actions';

export const showLoading = true;

const _showReducer = createReducer(showLoading,
  on(loadingShowChange, state => state  = false ),
  on(loadingHiddenChange, state => state  = true),
);

export function showReducer(state, action) {
  return _showReducer(state, action);
}
