import initialState from '../../initialState';
import { START_LOADING, END_LOADING } from '../../constants/loadingConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const loadingReducer = (state = initialState.loading, action) => {
    let new_state
    switch (action.type) {
        case START_LOADING:
            new_state = cloneDeep(state);
            return merge(new_state, {"loading": action.payload});
        case END_LOADING:
            new_state = cloneDeep(state);
            return merge(new_state, {"loading": action.payload});
        default:
            return state;
    }
}