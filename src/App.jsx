import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';

import AppDrawer from './Components/AppDrawer';
import LoginDialog from './Components/Dialogs/LoginDialog';
import RegisterDialog from './Components/Dialogs/RegisterDialog';
import ForgetPassDialog from './Components/Dialogs/ForgetPassDialog';
import Main from './Components/Pages/Main';
import Error from './Components/Pages/404';
import Profile from './Components/Pages/Profile';
import DownloadMateri from './Components/Pages/DownloadMateri';
import DownloadLaporan from './Components/Pages/DownloadLaporan';

import _ from 'lodash';
import './Manual.css';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    kata: process.env.REACT_APP_WEBSITE_NAME,
    user: {
      // nama: 'Givary Muhammad',
      // nim: '201631202',
      // no_telp: '082243774207',
      // is_asisten: true
    },
    setUser: data => this.setState({ user: data }),
    checkUser: () => !_.isEqual(this.state.user, {}),
    // Login Dialog State
    loginDialog: false,
    setLogin: set => this.setState({ loginDialog: set }),
    // Register Dialog State
    registerDialog: false,
    setRegister: set => this.setState({ registerDialog: set }),
    // Forget Password State
    forgetDialog: false,
    setForget: set => this.setState({ forgetDialog: set }),
    // Loading / LinearProgress bar
    loading: false,
    isLoading: set => this.setState({ loading: set })
  };

  componentDidMount() {
    const logdata = {
      nama: 'Givary Muhammad',
      nim: '201631202',
      no_telp: '082243774207',
      is_asisten: false
    };

    this.state.setUser(logdata);

    console.log(process.env.REACT_APP_API);
    console.log('First');
    document.title = 'Basic Laboratory';
  }

  componentDidUpdate() {
    console.log(_.isEqual(this.state.user, {}));
  }

  profileValidation = () => {
    if (this.state.checkUser()) {
      console.log('Welcome !!');
      return <Profile />;
    } else {
      console.log('Not Authorized !');
      return <Main />;
    }
  };

  render() {
    return (
      <BrowserRouter>
        <AppContext.Provider value={this.state}>
          <CssBaseline />
          <LinearProgress color='primary' />
          <AppDrawer>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route path='/materi' component={DownloadMateri} />
              <Route path='/laporan' component={DownloadLaporan} />
              <Route path='/profile' render={this.profileValidation} />
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
