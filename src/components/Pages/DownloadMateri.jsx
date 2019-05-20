import React, { Fragment } from 'react'
import { withStyles, Typography } from '@material-ui/core';

const style = theme => ({
  root: {}
});

const DownloadMateri = props => (
  <Fragment>
    <Typography variant='h4'>Download Materi</Typography>
  </Fragment>
);

export default withStyles(style, { withTheme: true })(DownloadMateri);
