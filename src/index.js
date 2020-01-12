import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue, lightBlue } from '@material-ui/core/colors';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'white'
      }
    },
    MuiTypography:{
      colorInherit:{
        color: 'white'
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);
