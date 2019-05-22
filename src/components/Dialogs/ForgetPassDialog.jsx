import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

export default props => {
  const context = useContext(AppContext);
  const [nim, setNim] = useState();

  const handleSubmit = e => {
    if (nim) {
      e.preventDefault();
      console.log('Reset Password : ' + nim);
      context.setForget(false);
    }
  };

  return (
    <Dialog
      open={context.forgetDialog}
      onClose={() => context.setForget(false)}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Lupa Password ?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Isikan NIM anda di bawah ini, kemudian Asisten Lab akan melakukan
          Reset Password pada Akun anda.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          label='NIM'
          type='number'
          fullWidth
          required
          onChange={e => setNim(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => context.setForget(false)} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
