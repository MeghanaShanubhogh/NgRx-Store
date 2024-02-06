import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { logOut, loginSuccess, signUpSuccess } from "./auth.actions";

export function AuthReducer(state: any, action: any){
    return _AuthReducer(state,action);
}
const _AuthReducer = createReducer(initialState,
    on(loginSuccess,(state: any, action: any)=>{
        return{
            ...state,
            user: action.user,
        }
    }),
    on(signUpSuccess,(state: any, action: any)=>{
        console.log(action.user);
        return{
            ...state,
            user: action.user,
        }
    }),
    on(logOut, (state)=>{
        return{
            ...state,
            user: null
        }
    }),
);