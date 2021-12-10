import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './Components/Routes/AppRouter';

function App() {
  return (
    <div style={{backgroundColor:'#F7F8FC'}}>
    <Router>
        <AppRouter />
    </Router>
</div>
  );
}

export default App;
