import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import NavBar from "./components/NavBar";
import AppRoutes from './components/AppRoutes';

function App() {

  return (
    <Router>
      <div className='app'>
        <h1>The Devlog Devlog</h1>
        <p>Wherein we log the development of a means by which to log development</p>
        <NavBar/>
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
