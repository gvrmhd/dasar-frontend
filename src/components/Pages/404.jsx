import React, { Fragment } from 'react';
import { withStyles, Typography } from '@material-ui/core';

const style = theme => ({
  root: {}
});

const Error = props => {

  return (
    <Fragment>
      <Typography variant='h4'>Halaman Tidak ditemukan !!</Typography>
      <div
        style={{
          width: 400,
          height: 400,
          backgroundColor: 'red',
          textAlign: 'center',
          verticalAlign: 'center'
        }}
      >
        BOX
      </div>
    </Fragment>
  );
};

export default withStyles(style, { withTheme: true })(Error);
