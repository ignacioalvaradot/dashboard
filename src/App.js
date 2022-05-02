import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Components/Routes/AppRouter";
import { Provider } from "react-redux";
import generateStore from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function App() {
  const store = generateStore();
  const persistor = persistStore(store);

  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AppRouter />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
