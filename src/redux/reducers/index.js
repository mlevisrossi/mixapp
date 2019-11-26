import { combineReducers } from 'redux';

import { reducerFiles } from './FileReducer/index';
import { reducerDict } from './DictionaryReducer/index';
import { reducerTotalOrder } from './TotalOrderReducer/index';


const allReducers = Object.assign({}, 
    reducerFiles,
    reducerDict,
    reducerTotalOrder
    );

export const reducers = combineReducers(
    allReducers
);