import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  Avatar,
  Typography
} from '@material-ui/core/';
import ResetIcon from '@material-ui/icons/SettingsBackupRestore';
import { AppContext } from '../../App';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    // margin: theme.spacing.(2)
  },
  submit: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3)
  },
  input: {
    marginTop: theme.spacing(2)
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
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // Close DialogBox and Remove All Value
  const closeDialog = () => {
    props.setOpen(false);
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

  // Handle Submit Button
  const handleSubmit = e => {
    closeDialog();
    e.preventDefault();
    context.isLoading(true);

    // Reset Password Request ...
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby='form-dialog-title'
    >
      <DialogContent className={classNames('hideScroll', classes.root)}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ResetIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Reset Password
          </Typography>
          <Typography component='h3' variant='subtitle1'>
            {props.nim}
          </Typography>
        </div>

        <ValidatorForm
          className={classes.form}
          onSubmit={e => handleSubmit(e)}
          onError={errors => console.log(errors)}
        >
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

          <div className={classes.paper}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
              fullWidth
            >
              reset
            </Button>
          </div>
        </ValidatorForm>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
