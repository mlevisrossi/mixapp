import { combineReducers } from 'redux';

import { reducerFiles } from './FileReducer/index';
import { reducerDict } from './DictionaryReducer/index';
import { reducerTotalOrder } from './TotalOrderReducer/index';
import { reducerMaxReviews } from './MaxReviewsReducer/index';


const allReducers = Object.assign({}, 
    reducerFiles,
    reducerDict,
    reducerTotalOrder,
    reducerMaxReviews
);

export const reducers = combineReducers(
    allReducers
);