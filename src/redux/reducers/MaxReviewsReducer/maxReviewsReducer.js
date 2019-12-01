import initialState from '../../initialState';
import { MAXREVIEWS_SET, MAXREVIEWS_CLEAN  } from '../../constants/maxReviewsConstants'
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';


export const maxReviewsReducer = (state = initialState.maxReviews, action) => {
    let new_state
    switch (action.type) {
        case MAXREVIEWS_SET:
            new_state = cloneDeep(state);
            return merge(new_state, {"max": action.payload});
        case MAXREVIEWS_CLEAN:
                return {};
        default:
            return state;
    }
}
