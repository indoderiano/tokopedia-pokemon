import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/PokemonList'
import Details from './Pages/PokemonDetails'
import Collection from './Pages/Collection'
import { Switch, Route } from 'react-router-dom'
import ThemeContext from './context'

const themes = {
  covid: {
      background: "#464f41",
      isCovid: true
  },
  normal: {
      // background: "rgba(24,27,29)",
      background: "#181B1D",
      isCovid: false
  }
};


function App() {
  const [theme, setTheme] = useState(themes.normal)
  
  const toggleThemes = () => {
    if(theme.isCovid){
      setTheme(themes.normal)
    }else{
      setTheme(themes.covid)
    }
  }
  return (
    <div className="App">
      <ThemeContext.Provider value={{theme, toggleThemes}}>
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
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
