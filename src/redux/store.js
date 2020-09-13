import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

export default store;
