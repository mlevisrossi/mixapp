import { combineReducers } from 'redux';

import { reducerFiles } from './FileReducer/index';
import { reducerDict } from './DictionaryReducer/index';
import { reducerTotalOrder } from './TotalOrderReducer/index';
import { reducerMaxReviews } from './MaxReviewsReducer/index';
import { reducerLoading } from './LoadingReducer/index';


const allReducers = Object.assign({}, 
    reducerFiles,
    reducerDict,
    reducerTotalOrder,
    reducerMaxReviews,
    reducerLoading
);

export const reducers = combineReducers(
    allReducers
);