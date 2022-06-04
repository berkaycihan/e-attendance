import React, { Component } from "react";
import "./App.css";
//import Ogrenci from './components/Ogrenci';
//import Ders from './components/Ders';
//import Ogretmen from './components/Ogretmen';
import Navbar from "./Navbar";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
//import { loggedin1 } from "./Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route component={NotFound} />
          </Switch>
          <br />
          <footer>
            <h6 className="text-center small">
              Copyright &copy; 2022 - 1191602801. Tüm Hakları Saklıdır.
            </h6>
          </footer>
        </div>
      </Router>
    );
  }
}
export default App;
