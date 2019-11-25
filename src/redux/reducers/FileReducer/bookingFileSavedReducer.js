import initialState from '../../initialState';
import { BOOKINGFILE_SAVED, BOOKINGFILE_SAVED_CLEAN } from '../../constants/fileConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const bookingFileSavedReducer = (state = initialState.fileBookingSaved, action) => {
    let new_state
    switch (action.type) {
        case BOOKINGFILE_SAVED:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case BOOKINGFILE_SAVED_CLEAN :
                return {};
        default:
            return state;
    }
}