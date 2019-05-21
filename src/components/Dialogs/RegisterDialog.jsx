import React, { useContext, useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  Avatar,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core/';
import { PersonAdd } from '@material-ui/icons';
import { AppContext } from '../../App';

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
    marginTop: theme.spacing.unit * 5
  }
});

const RegisterDialog = props => {
  // Get Root Context
  const context = useContext(AppContext);

  // Form Data State
  const [nim, setNim] = useState();
  const [telp, setTelp] = useState();
  const [nama, setNama] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  // MaterialUI Theme Classes
  const { classes } = props;

  // Close DialogBox and Remove All Value
  const closeDialog = () => {
    context.setRegister(false);
    setNim();
    setPassword();
  };

  // Handle Submit Button
  const handleSubmit = e => {
    const data = { nim, password, nama, password2, telp };
    if (data.nim && data.password) {
      e.preventDefault();
      closeDialog();
      console.log(data);
    }
  };

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={context.registerDialog}
        onClose={() => context.setRegister(false)}
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
          <form className={classes.form}>
            <FormControl margin='normal' fullWidth required>
              <InputLabel htmlFor='nim'>NIM</InputLabel>
              <Input type='number' onChange={e => setNim(e.target.value)} />
            </FormControl>

            <FormControl margin='normal' fullWidth required>
              <InputLabel>Nama</InputLabel>
              <Input type='text' onChange={e => setNama(e.target.value)} />
            </FormControl>

            <FormControl margin='normal' fullWidth required>
              <InputLabel htmlFor='telp'>No. Telpon</InputLabel>
              <Input type='number' onChange={e => setTelp(e.target.value)} />
            </FormControl>

            <FormControl margin='normal' fullWidth required>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                type='password'
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl margin='normal' fullWidth required>
              <InputLabel htmlFor='password'>Verify Password</InputLabel>
              <Input
                type='password'
                onChange={e => setPassword2(e.target.value)}
              />
            </FormControl>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(RegisterDialog);
