import React, { useContext, useState, useEffect, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  Avatar,
  Typography
} from '@material-ui/core/';
import { PersonAdd } from '@material-ui/icons';
import { AppContext } from '../../App';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 5
  },
  input: {
    marginTop: theme.spacing.unit * 2
  }
});

const RegisterDialog = props => {
  // Get Root Context
  const context = useContext(AppContext);

  // Form Data State
  const [nim, setNim] = useState('');
  const [no_hp, setHp] = useState('');
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // MaterialUI Theme Classes
  const { classes } = props;

  // Close DialogBox and Remove All Value
  const closeDialog = () => {
    context.setRegister(false);
    setNim('');
    setHp('');
    setNama('');
    setPassword('');
    setPassword2('');
  };

  // Adding Confirm Password Validation
  useEffect(() => {
    ValidatorForm.addValidationRule('passwordMatch', val => {
      if (val !== password) {
        return false;
      }
      return true;
    });
  }, [password]);

  // Handle Form Submit
  const formSubmitted = e => {
    const params = { nim, password, nama, no_hp };
    const url = process.env.REACT_APP_API + '/auth/register';

    e.preventDefault();
    context.isLoading(true);
    closeDialog();
    console.log(params);

    axios
      .request({ method: 'POST', url, params })
      .then(res => {
        console.log(res.data);
        context.isLoading(false);
      })
      .catch(err => {
        console.log(err);
        context.isLoading(false);
      });
  };

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={context.registerDialog}
        onClose={closeDialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent className='hideScroll'>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonAdd />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Register
            </Typography>
          </div>

          <ValidatorForm
            className={classes.form}
            onSubmit={e => formSubmitted(e)}
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
              label='Nama'
              onChange={e => setNama(e.target.value)}
              name='nama'
              value={nama}
              validators={['required']}
              errorMessages={['Field ini harus di isi']}
            />

            <TextValidator
              className={classes.input}
              fullWidth
              label='No Handphone'
              onChange={e => setHp(e.target.value)}
              name='no_hp'
              value={no_hp}
              validators={['required', 'isNumber']}
              errorMessages={['Field ini harus di isi !', 'Harus berupa angka']}
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

            <TextValidator
              className={classes.input}
              fullWidth
              type='password'
              label='Konfirmasi Password'
              onChange={e => setPassword2(e.target.value)}
              name='password2'
              value={password2}
              validators={['required', 'passwordMatch']}
              errorMessages={[
                'Field ini harus di isi !',
                'Password tidak sama !'
              ]}
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
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
