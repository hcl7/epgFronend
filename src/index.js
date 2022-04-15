import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import { BrowserRouter } from 'react-router-dom';

const logger = store => {
    return next => {
        return action =>{
            console.log('[Midleware] Dispatching', action);
            const result = next(action);
            console.log('[Midleware] next State', store.getState());
            return result;
        }
    }
}

const rootReducer = combineReducers({
    reducer: reducer
});
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider> 
);

ReactDOM.render( app, document.getElementById( 'root' ) );
reportWebVitals();