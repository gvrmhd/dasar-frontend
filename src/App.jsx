import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';

import LoginDialog from './Components/Dialogs/LoginDialog';
import RegisterDialog from './Components/Dialogs/RegisterDialog';
import ForgetPassDialog from './Components/Dialogs/ForgetPassDialog';
import AppDrawer from './Components/AppDrawer';
import Main from './Components/Pages/Main';
import Error from './Components/Pages/404';
import Profile from './Components/Pages/Profile';
import DownloadMateri from './Components/Pages/DownloadMateri';
import DownloadLaporan from './Components/Pages/DownloadLaporan';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    kata: 'Basic Laboratory',
    user: {
      nim: '201631202',
      nama: 'Givary Muhammad',
      no_hp: '081324556128',
      is_asisten: true
    },
    setUser: data => this.setState({ user: data }),
    // Login Dialog State
    loginDialog: false,
    loginOpen: () => this.setState({ loginDialog: true }),
    loginClose: () => this.setState({ loginDialog: false }),
    // Register Dialog State
    registerDialog: false,
    registerOpen: () => this.setState({ registerDialog: true }),
    registerClose: () => this.setState({ registerDialog: false }),
    // Forget Password State
    forgetDialog: false,
    forgetOpen: () => this.setState({ forgetDialog: true }),
    forgetClose: () => this.setState({ forgetDialog: false }),
    // Loading / LinearProgress bar
    loading: false,
    isLoading: ans => this.setState({ loading: ans })
  };

  componentDidMount() {
    console.log('First');
    document.title = 'Basic Laboratory';
  }

  componentDidUpdate() {
    console.log('Fired');
    if(!this.state.user) {
      console.log('No User');
    }
  }

  render() {
    return (
      <BrowserRouter>
        <AppContext.Provider value={this.state}>
          <CssBaseline />
          <LinearProgress color='primary' />
          <AppDrawer>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route path='/profile' component={Profile} />
              <Route path='/materi' component={DownloadMateri} />
              <Route path='/laporan' component={DownloadLaporan} />
              <Route component={Error} />
            </Switch>
          </AppDrawer>
          <LoginDialog />
          <RegisterDialog />
          <ForgetPassDialog />
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
