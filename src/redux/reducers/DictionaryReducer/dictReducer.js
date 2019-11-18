import initialState from '../../initialState';
import { DICT_CREATE, DICT_CLEAN } from '../../constants/dictConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const dictReducer = (state = initialState.hotelsDict, action) => {
    let new_state
    switch (action.type) {
        case DICT_CREATE:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case DICT_CLEAN:
                return {};
        default:
            return state;
    }
}