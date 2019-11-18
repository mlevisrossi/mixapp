import { combineReducers } from 'redux';

import { reducerFiles } from './FileReducer/index';
import { reducerDict } from './DictionaryReducer/index';


const allReducers = Object.assign({}, 
    reducerFiles,
    reducerDict
    );

export const reducers = combineReducers(
    allReducers
);