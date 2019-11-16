import initialState from '../../initialState';
import { BOOKINGFILE_SELECTED, BOOKINGFILE_CLEAN } from '../../constants/fileConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const bookingFileReducer = (state = initialState.fileBooking, action) => {
    let new_state
    switch (action.type) {
        case BOOKINGFILE_SELECTED:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case BOOKINGFILE_CLEAN:
                return {};
        default:
            return state;
    }
}