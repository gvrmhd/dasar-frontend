import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  Avatar,
  Typography
} from '@material-ui/core/';
import { Person } from '@material-ui/icons';
import { AppContext } from '../../App';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    // margin: theme.spacing.unit * 2
  },
  submit: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
    width: 'calc(100% - 70px)'
  },
  input: {
    marginTop: theme.spacing.unit * 2
  }, 
  root: {
    width: theme.spacing(38)
  }
}));

const LoginDialog = props => {
  // Get Root Context
  const context = useContext(AppContext);
  
  // MUI JSS hook
  const classes = useStyles();

  // Form Data State
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  // Close DialogBox and Remove All Value
  const closeDialog = () => {
    context.setLogin(false);
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

    const key = context.snack({ msg: 'Sending form data', stay: true });

    axios
      .request({ method: 'POST', url, params })
      .then(res => {
        context.endSnack(key);

        if (res.data.status) {
          localStorage.setItem('Token', res.data.data.token);
          context.getProfile();
        } else {
          context.snack({ msg: res.data.message, type: 'error' });
          context.isLoading(false);
        }
      })
      .catch(err => {
        context.endSnack(key);
        
        context.snack({ msg: 'Koneksi Gagal !', type: 'error' });
        context.isLoading(false);
      });
  };

  return (
    <Dialog
      open={context.loginDialog}
      onClose={() => context.setLogin(false)}
      aria-labelledby='form-dialog-title'
    >
      <DialogContent className={classNames('hideScroll', classes.root)}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
        </div>

        <ValidatorForm
          className={classes.form}
          onSubmit={e => handleSubmit(e)}
          onError={errors => console.log(errors)}
        >
          <TextValidator
            autoComplete='off'
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
          <div className={classes.paper}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
              fullWidth
            >
              Log In
            </Button>
          </div>
        </ValidatorForm>
      </DialogContent>
    </Dialog>
  );
};

export default (LoginDialog);
