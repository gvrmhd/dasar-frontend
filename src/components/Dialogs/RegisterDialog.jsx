import React, { useContext, useState, useEffect, Fragment } from 'react';
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
import { PersonAdd } from '@material-ui/icons';
import { AppContext } from '../../App';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
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
    // margin: theme.spacing.unit * 3
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    height: theme.spacing.unit * 6,
    // width: `calc(100% - 60px)`
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
    const key = context.snack({ msg: 'Mengirim Form Data', stay: true });

    e.preventDefault();
    context.isLoading(true);
    closeDialog();
    console.log(params);

    axios
      .request({ method: 'POST', url, params })
      .then(res => {
        context.endSnack(key);

        if (res.data.status) {
          context.snack({ msg: res.data.message, type: 'success' });
        } else {
          context.snack({ msg: res.data.message, type: 'warning' });
        }
        context.isLoading(false);
      })
      .catch(err => {
        context.snack({ msg: 'Koneksi Error !', type: 'error' });
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
              autoFocus
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

            <FormControlLabel
            style={{ marginTop: 25 }}
              className={classes.input}
              control={<Checkbox value='remember' color='primary' />}
              label='Saya berjanji akan memperhatikan Dosen/Asisten yang mengajar.'
            />

            <div className={classes.paper}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
                fullWidth
              >
                Daftar
              </Button>
            </div>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
