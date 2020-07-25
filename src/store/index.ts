import { createStore, Store, compose, applyMiddleware } from 'redux'
import rootReducer, { AppState } from './ducks/rootReducer'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './ducks/rootSaga'
const sagaMiddleware = createSagaMiddleware()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store: Store<AppState> = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store