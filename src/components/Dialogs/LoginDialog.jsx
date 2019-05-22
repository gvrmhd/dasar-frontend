import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core/';
import { Person } from '@material-ui/icons';
import { AppContext } from '../../App';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
import jwt from 'jwt-decode';
import compose from 'recompose';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
    // padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
    //   .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  input: {
    marginTop: theme.spacing.unit * 2
  }
});

const LoginDialog = ({ classes }) => {
  // Get Root Context
  const context = useContext(AppContext);

  // Form Data State
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // Close DialogBox and Remove All Value
  const closeDialog = () => {
    context.setLogin(false);
    setRemember(false);
    setPassword('');
    setNim('');
  };

  // Handle Submit Button
  const handleSubmit = e => {
    const params = { nim, password };
    const url = process.env.REACT_APP_API + '/auth/login';

    closeDialog();
    e.preventDefault();
    context.isLoading(true);

    axios
      .request({ method: 'POST', url, params })
      .then(res => {
        if (res.data.status) {
          localStorage.setItem('Token', res.data.data.token);
          alert('Berhasil Login');
          context.getProfile();
        } else {
          alert(res.data.message);
          context.isLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        context.isLoading(false);
      });
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={context.loginDialog}
        onClose={() => context.setLogin(false)}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent className='hideScroll'>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Person />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Login
            </Typography>
          </div>

          <ValidatorForm
            onSubmit={e => handleSubmit(e)}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              className={classes.input}
              fullWidth
              label='NIM'
              onChange={e => setNim(e.target.value)}
              name='nim'
              value={nim}
              validators={[
                'required',
                'isNumber',
                'maxStringLength:9',
                'minStringLength:9'
              ]}
              errorMessages={[
                'Field ini harus di isi',
                'NIM harus berupa angka',
                'NIM Harus 9 angka',
                'NIM Harus 9 angka'
              ]}
            />

            <TextValidator
              className={classes.input}
              fullWidth
              type='password'
              label='Password'
              onChange={e => setPassword(e.target.value)}
              name='password'
              value={password}
              validators={['required']}
              errorMessages={['Field ini harus di isi !']}
            />

            <FormControlLabel
              className={classes.input}
              control={
                <Checkbox
                  value='remember'
                  color='primary'
                  onChange={(e, check) => setRemember(check)}
                />
              }
              label='Remember me'
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
              fullWidth
            >
              Submit
            </Button>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(LoginDialog);
