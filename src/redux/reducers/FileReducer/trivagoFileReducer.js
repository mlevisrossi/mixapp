import initialState from '../../initialState';
import { TRIVAGOFILE_SELECTED, TRIVAGOFILE_CLEAN } from '../../constants/fileConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const trivagoFileReducer = (state = initialState.fileTrivago, action) => {
    let new_state
    switch (action.type) {
        case TRIVAGOFILE_SELECTED:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case TRIVAGOFILE_CLEAN:
                return {};
        default:
            return state;
    }
}