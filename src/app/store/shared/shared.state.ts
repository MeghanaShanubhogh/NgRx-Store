export interface SharedState{
    showLoading: boolean;
    errorMessage: string;
    isError: boolean;
}
export const initilaState:SharedState = {
    showLoading : false,
    errorMessage: "",
    isError: false,
}