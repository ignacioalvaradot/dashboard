import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  hablaReducer,
  dataExpReducer,
  dataUpdateReducer,
} from "./metricasDucks";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["metricaHabla", "DatosUpdate"],
};

const rootReducer = combineReducers({
  metricaHabla: hablaReducer,
  DatosExp: dataExpReducer,
  DatosUpdate: dataUpdateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
