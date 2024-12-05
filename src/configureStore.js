import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

// const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default function configureStore() {
    const middlewares = [thunk]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]

    const environment = process.env.NODE_ENV || 'development';
    const composedEnhancers = environment==='development'? composeWithDevTools(...enhancers):compose(...enhancers)
    //const composedEnhancers = compose(...enhancers)

    const store = createStore(rootReducer, composedEnhancers)
    return store
}