import initialState from '../../initialState';
import { TOTALORDER_ADD, TOTALORDER_CLEAN  } from '../../constants/totalOrderConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const totalOrderReducer = (state = initialState.totalOrder, action) => {
    let new_state
    switch (action.type) {
        case TOTALORDER_ADD:
            new_state = cloneDeep(state);
            return merge(new_state, action.payload);
        case TOTALORDER_CLEAN:
                return {};
        default:
            return state;
    }
}