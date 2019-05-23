import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { compose } from 'recompose';
import { Button, CssBaseline } from '@material-ui/core';

import Dashboard from './Components/Dashboard';
import About from './Components/About';

import LoginDialog from './Components/Dialogs/LoginDialog';
import RegisterDialog from './Components/Dialogs/RegisterDialog';
import ForgetPassDialog from './Components/Dialogs/ForgetPassDialog';
import Main from './Components/Pages/Main';
import Profile from './Components/Pages/Profile';
import DownloadMateri from './Components/Pages/DownloadMateri';
import DownloadLaporan from './Components/Pages/DownloadLaporan';

import axios from 'axios';
import jwt from 'jwt-decode';
import _ from 'lodash';
import './Manual.css';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    kata: process.env.REACT_APP_WEBSITE_NAME,
    // User Data
    user: {
      // nama: 'Givary Muhammad',
      // nim: '201631202',
      // no_telp: '082243774207',
      // is_asisten: true
    },
    setUser: data => this.setState({ user: data }),
    // User Status
    logStatus: false,
    setLog: set => this.setState({ logStatus: set }),
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
    isLoading: set => this.setState({ loading: set }),
    // Router Pusher
    goto: this.props.history.push,
    // Custom SnackBar
    snack: ({ msg, type, stay }) =>
      this.props.enqueueSnackbar(msg, {
        variant: type,
        persist: stay,
        autoHideDuration: stay ? null : 4000,
        action: !stay
          ? key => (
              <Button
                color='inherit'
                onClick={() => this.props.closeSnackbar(key)}
              >
                OK
              </Button>
            )
          : null
      }),
    // Close Snackbar
    endSnack: key => this.props.closeSnackbar(key),
    // Get user data from token
    getProfile: () => {
      const token = localStorage.getItem('Token');

      if (!_.isEmpty(token)) {
        this.setState({ loading: true });

        const nim = jwt(token).custom.nim;
        const url = process.env.REACT_APP_API + '/mahasiswa/' + nim;
        const headers = { Token: token };
        const kay = this.state.snack({ msg: 'Loading User Data', stay: true });

        axios
          .request({ method: 'GET', url, headers })
          .then(res => {
            this.props.closeSnackbar(kay);
            if (res.data.status) {
              console.log(res.data.data);
              this.state.snack({ msg: 'Berhasil Login', type: 'success' });
              this.setState({
                user: res.data.data,
                loading: false,
                logStatus: true
              });
            } else {
              this.state.snack({ msg: res.data.message, type: 'warning' });
              this.setState({ loading: false, logStatus: false });
            }
          })
          .catch(err => {
            this.props.closeSnackbar(kay);
            this.state.snack({ msg: 'Koneksi Gagal !', type: 'error' });
            this.setState({ loading: false, logStatus: false });
            console.log(err);
          });
      } else {
        console.log('No Token ...');
      }
    }
  };

  profileValidation = () => {
    if (this.state.logStatus) {
      console.log('Welcome !!');
      return <Profile />;
    } else {
      console.log('Not Authorized !');
      return <Main />;
    }
  };

  componentDidMount() {
    this.state.getProfile();
    console.log(process.env.REACT_APP_API);
    this.props.history.push('/dash');
  }

  componentDidUpdate() {
    // Delete User if JWT Expired
    const token = localStorage.getItem('Token');
    if (!_.isEmpty(token)) {
      const exp = jwt(token).exp;
      if (Date.now() / 1000 > exp) {
        console.log('JWT Expired');
        localStorage.clear();
        this.setState({ user: {}, logStatus: false });
      }
    }

    // Delete User if Token Deleted
    if (_.isEmpty(token) && this.state.logStatus) {
      this.setState({
        user: {},
        logStatus: false
      });
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <CssBaseline />
        {/* ---------- Main Screen ---------- */}

        <Route
          path='/dash'
          render={() => (
            <Dashboard>
              <Switch>
                <Route exact path='/dash' component={Main} />
                <Route path='/dash/materi' component={DownloadMateri} />
                <Route path='/dash/laporan' component={DownloadLaporan} />
                <Route path='/dash/profile' render={this.profileValidation} />
              </Switch>
            </Dashboard>
          )}
        />

        <Route exact path='/' component={About} />

        {/* ---------- Dialog Components ---------- */}
        <LoginDialog />
        <RegisterDialog />
        <ForgetPassDialog />
      </AppContext.Provider>
    );
  }
}

export default compose(
  withRouter,
  withSnackbar
)(App);
