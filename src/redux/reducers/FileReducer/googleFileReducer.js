
import initialState from '../../initialState';
import { GOOGLEFILE_SELECTED, GOOGLEFILE_CLEAN } from '../../constants/fileConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const googleFileReducer = (state = initialState.fileGoogle, action) => {
    let new_state
    switch (action.type) {
        case GOOGLEFILE_SELECTED:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case GOOGLEFILE_CLEAN:
                return {};
        default:
            return state;
    }
}