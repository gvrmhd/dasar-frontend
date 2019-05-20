import React, { Fragment } from 'react'
import { withStyles, Typography } from '@material-ui/core';

const style = theme => ({
  root: {}
});

const DownloadLaporan = props => (
  <Fragment>
    <Typography variant='h4'>Download Laporan</Typography>
  </Fragment>
);

export default withStyles(style, { withTheme: true })(DownloadLaporan);
