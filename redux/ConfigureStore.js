//redux
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//reducers
import {words} from './words';
import {scoresrp} from './scores'
// import {word} from './word'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({words, scoresrp}), 
        applyMiddleware(thunk, logger)
    );
    return store;
}