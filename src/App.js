import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Components/Routes/AppRouter";
import {Provider} from 'react-redux';
import generateStore from "./redux/store.js";


function App() {
  const store = generateStore()
  
  return (
    <div
      style={{
        backgroundColor: "#F7F8FC",
        overflow: "hidden",
        paddingBlockEnd: "45px",
      }}
    >
      <Provider store = {store}>
      <Router>
        <AppRouter />
      </Router>
      </Provider>
    </div>
  );
}

export default App;
