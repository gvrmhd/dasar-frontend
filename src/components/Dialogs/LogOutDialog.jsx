import React, { useState, useContext, useEffect, Fragment } from 'react';
import { AppContext } from '../../App';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { SettingsBackupRestore } from '@material-ui/icons';

export default ({ close }) => {
  const context = useContext(AppContext);
  const [dialog, setDialog] = useState(false);

  const onClosed = () => {
    setDialog(false);
    close();
  };

  const handleSubmit = e => {
    console.log('LogOUt dahh');
    e.preventDefault();
    onClosed();

    localStorage.clear();
    context.setUser({});
    context.setLog(false);
    context.goto('/');
  };

  return (
    <Fragment>
      <MenuItem
        onClick={() => {
          setDialog(true);
        }}
      >
        <ListItemIcon>
          <SettingsBackupRestore />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>

      <Dialog
        open={dialog}
        onClose={onClosed}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Log Out ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Setelah Log out, maka anda tidak dapat Melihat Nilai Laporan dan
            Upload Tugas/Ujian. Anda Yakin ingin LogOut ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color='primary'variant='contained'>
            Iya
          </Button>
          <Button onClick={onClosed} color='primary' >
            Tidak
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
