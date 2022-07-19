import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={ LandingPage }/> 
        <Route exact path = '/home' component= { Home }/>
{/*         <Route exact path = '/dogs' component= />
        <Route exact path = '/dogs/:id' component= />
        <Route exact path = '/temperament' component= /> */}
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;