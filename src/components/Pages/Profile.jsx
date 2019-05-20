import React, { Fragment, useContext } from 'react';
import { AppContext } from '../../App';
import { withStyles, Typography } from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

const style = theme => ({});

const Profile = props => {
  const context = useContext(AppContext);

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        {context.user.nama}
      </Typography>
    </Fragment>
  );
};

export default withStyles(style, { withTheme: true })(Profile);
