import initialState from '../../initialState';
import { EXPEDIAFILE_SELECTED, EXPEDIAFILE_CLEAN } from '../../constants/fileConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const expediaFileReducer = (state = initialState.fileExpedia, action) => {
    let new_state
    switch (action.type) {
        case EXPEDIAFILE_SELECTED:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case EXPEDIAFILE_CLEAN:
                return {};
        default:
            return state;
    }
}