import { MAXREVIEWS_SET, MAXREVIEWS_CLEAN } from '../constants/maxReviewsConstants'

export const setMaxReviewsAction = (maxReviews) => {
    return {
        type: MAXREVIEWS_SET,
        payload: maxReviews
    };
}

export const cleanMaxReviewsAction = () => {
    return {
        type: MAXREVIEWS_CLEAN
    };
}