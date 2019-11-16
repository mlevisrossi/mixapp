import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

//Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './redux/reducers/index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import AppRoutes from './routes';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(logger, thunk),
);
const store = createStore(reducers, enhancer);

render(
    <Provider store={store}>
        <Router>
            <AppRoutes />
        </Router>
    </Provider>, 
    document.getElementById('root')
);