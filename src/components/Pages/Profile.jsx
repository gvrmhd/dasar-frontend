import React, { Fragment, useContext } from 'react';
import { AppContext } from '../../App';
import { withStyles, Typography } from '@material-ui/core';

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
