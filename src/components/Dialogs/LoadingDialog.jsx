import React, { useState, useContext, Fragment } from 'react';
import { AppContext } from '../../App';
import { Dialog, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const LoadingDialog = props => {
  const useStyles = makeStyles(theme => ({
    colorPrimary: {
      color: theme.palette.common.white
    }
  }));

  const classes = useStyles();

  return (
    <div style={{ textAlign: 'center' }} >
      <CircularProgress classes={{ colorPrimary: classes.colorPrimary }} />
      <br/>
      <Typography variant='h6' className={classes.colorPrimary}>
        Loading
      </Typography>
    </div>
  );
};

export default props => {
  const context = useContext(AppContext);

  return (
    <Dialog
      open={context.loadingDialog}
      onClose={() => context.isLoadingDialog(false)}
      aria-labelledby='form-dialog-title'
      PaperComponent={LoadingDialog}
      disableBackdropClick
      // disableEscapeKeyDown
    />
  );
};
