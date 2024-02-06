import { createReducer, on } from "@ngrx/store";
import { addCustomValue, changeChannelName, decrement, increment, reset } from "./counter.actions";
import { initialState } from "./counter.state";

const _counterReducer = createReducer(
    initialState, 
    on(increment,(state)=>{
        return {
            ...state,
            counter: state.counter+1
        }
    }),
    on(decrement,(state)=>{
        return {
            ...state,
            counter: state.counter-1
        }
    }),
    on(reset,(state)=>{
        return {
            ...state,
            counter: 0
        }
    }), 
    on(addCustomValue,(state,action)=>{
        console.log(action);
        return{
            ...state,
            counter: state.counter+action.value
        }
    }),
    on(changeChannelName,(state,action)=>{
        console.log(action);
        return{
            ...state,
            channelName: action.channel
        }
    })
);
export function counterReducer(state:any, action:any){
    return _counterReducer(state,action);
}