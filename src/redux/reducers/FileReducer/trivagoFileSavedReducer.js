import initialState from '../../initialState';
import { TRIVAGOFILE_SAVED, TRIVAGOFILE_SAVED_CLEAN } from '../../constants/fileConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const trivagoFileSavedReducer = (state = initialState.fileTrivagoSaved, action) => {
    let new_state
    switch (action.type) {
        case TRIVAGOFILE_SAVED:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case TRIVAGOFILE_SAVED_CLEAN :
                return {};
        default:
            return state;
    }
}