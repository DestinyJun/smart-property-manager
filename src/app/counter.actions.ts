import { createAction } from '@ngrx/store';
export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
export const loadingShowChange = createAction('[Counter Component] LoadingShowChange');
export const loadingHiddenChange = createAction('[Counter Component] LoadingHiddenChange');
