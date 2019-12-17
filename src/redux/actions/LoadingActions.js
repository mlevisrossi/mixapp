import { START_LOADING, END_LOADING } from '../constants/loadingConstants'

export const startLoadingAction = () => {
    return {
        type: START_LOADING,
        payload: true
    };
}

export const endLoadingAction = () => {
    return {
        type: END_LOADING,
        payload: false
    };
}