import { createAction, props } from "@ngrx/store";

export const SET_LOADING_ACTION = '[shared state] set loading spinner'; 
export const SET_ERROR_MESSAGE = '[shared state] set error';
export const SET_IS_ERROR_IND = '[shared state] set error indicator';

export const setLoadingSpinner = createAction(SET_LOADING_ACTION, props<{loadingState: boolean}>());
export const setErrorMessage = createAction(SET_ERROR_MESSAGE,props<{errorMsg: string}>());
export const setIsError = createAction(SET_IS_ERROR_IND,props<{isError: boolean}>());