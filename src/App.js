import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import Home from './Pages/PokemonList'
import Details from './Pages/PokemonDetails'
import Collection from './Pages/Collection'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/details/:name'>
            <Details/>
          </Route>
          <Route exact path='/collection'>
            <Collection/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
