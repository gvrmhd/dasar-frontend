import React, { useContext, useState } from 'react';
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
  FormControlLabel,
  Checkbox
} from '@material-ui/core/';
import { Person } from '@material-ui/icons';
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
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: theme.spacing.unit * 25
  }
});

const LoginDialog = props => {
  // Get Root Context
  const context = useContext(AppContext);

  // Form Data State
  const [nim, setNim] = useState();
  const [password, setPassword] = useState();
  const [remember, setRemember] = useState(false);

  // MaterialUI Theme Classes
  const { classes } = props;

  // Close DialogBox and Remove All Value
  const closeDialog = () => {
    context.setLogin(false);
    setNim();
    setPassword();
    setRemember(false);
  };

  // Handle Submit Button
  const handleSubmit = e => {
    const data = { nim, password, remember };
    if (data.nim && data.password) {
      e.preventDefault();
      closeDialog();
      console.log(data);
    }
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
            <form className={classes.form} >
              <FormControl margin='normal' fullWidth required>
                <InputLabel htmlFor='nim'>NIM</InputLabel>
                <Input type='number' onChange={e => setNim(e.target.value)} />
              </FormControl>
              <FormControl margin='normal' fullWidth required>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  type='password'
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    value='remember'
                    color='primary'
                    onChange={(e, check) => setRemember(check)}
                  />
                }
                label='Remember me'
              />
              <div style={{ textAlign: 'center' }}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(LoginDialog);
