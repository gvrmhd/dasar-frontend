import React, { Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';

const style = theme => ({
  root: {
  }
});

const Error = ({ classes }) => {

  return (
    <div className={classes.root}>
      <Typography variant='h4'>Halaman Tidak ditemukan !!</Typography>
      <Typography variant='h6'>Jangan pake routing manual bre ...</Typography>
    </div>
  );
};

export default withStyles(style, { withTheme: true })(Error);
