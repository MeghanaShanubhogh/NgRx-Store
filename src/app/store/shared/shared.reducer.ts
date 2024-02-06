import { createReducer, on } from "@ngrx/store";
import { initilaState } from "./shared.state";
import { setErrorMessage, setIsError, setLoadingSpinner } from "./shared.actions";

export function loadingSpinnerReducer(state: any, action: any){
    return _loadingSpinnerReducer(state,action);
}

const _loadingSpinnerReducer = createReducer(initilaState,
    on(setLoadingSpinner,(state,action)=>{
        return{
            ...state,
            showLoading: action.loadingState
        }
    }),
    on(setErrorMessage,(state, action)=>{
        //console.log('setErrorMessage');
        return{
            ...state,
            errorMessage: action.errorMsg
        }
    }),
    on(setIsError, (state,action)=>{
        return{
            ...state,
            isError: action.isError
        }
    })
);