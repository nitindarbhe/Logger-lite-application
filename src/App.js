import './App.css';
import { React } from 'react';
import Navbar from './components/Navbar';
import NavbarTop from './components/NavbarTop';
// import { Router, Switch } from 'react-router';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewLogs from './pages/ViewLogs';
import DisplayLogApiResult from './pages/DisplayLogApiResult';
import Team from './pages/Team';
import DisplayTable from './pages/Table';

function App() {
  return (
    <>
      <Router>
        <NavbarTop />
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path='/viewLogs' component={ViewLogs} /> */}
          {/* <Route path='/products' component={Products} /> */}
          <Route path='/team' component={Team} />
          <Route path='/displayTable' component={DisplayLogApiResult} />
          {/* <Route path='/displayTable'>
            <DisplayTable />
          </Route> */}
          {/* <Route exact path='/displayTable' render={() => <DisplayTable />} /> */}

        </Switch>
      </Router>
    </>
  );
}

export default App;
