import initialState from '../../initialState';
import { EXPEDIAFILE_SAVED, EXPEDIAFILE_SAVED_CLEAN } from '../../constants/fileConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const expediaFileSavedReducer = (state = initialState.fileExpediaSaved, action) => {
    let new_state
    switch (action.type) {
        case EXPEDIAFILE_SAVED:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case EXPEDIAFILE_SAVED_CLEAN :
                return {};
        default:
            return state;
    }
}