import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import Home from './Pages/PokemonList'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
