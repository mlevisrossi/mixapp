import { combineReducers } from 'redux';

import { reducerFiles } from './FileReducer/index';

const allReducers = Object.assign({}, 
    reducerFiles
    );

export const reducers = combineReducers(
    allReducers
);