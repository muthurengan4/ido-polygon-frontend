import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import reducer from "./reducers";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const store = createStore(reducer, compose(...enhancers));

sagaMiddleware.run(mySaga);

export default store;
