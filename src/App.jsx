import React, { Component } from 'react';
import AppDrawer from './components/AppDrawer';
import Body from './components/Main';
import CssBaseline from '@material-ui/core/CssBaseline';

export const AppContext = React.createContext();

class App extends Component {
  state = {};

  render() {
    return (
      <AppContext.Provider>
        <CssBaseline/>
        <AppDrawer>
          <Body />
        </AppDrawer>
      </AppContext.Provider>
    );
  } 
}

export default App;
