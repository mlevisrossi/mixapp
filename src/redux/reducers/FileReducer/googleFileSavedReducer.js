import initialState from '../../initialState';
import { GOOGLEFILE_SAVED, GOOGLEFILE_SAVED_CLEAN } from '../../constants/fileConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const googleFileSavedReducer = (state = initialState.fileGoogleSaved, action) => {
    let new_state
    switch (action.type) {
        case GOOGLEFILE_SAVED:
            return Object.assign({}, state, action.payload );
        case GOOGLEFILE_SAVED_CLEAN :
                return {};
        default:
            return state;
    }
}