import React, { Fragment, useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import { withStyles, Typography, Avatar } from '@material-ui/core';

const style = theme => ({});

const Profile = props => {
  const context = useContext(AppContext);

  useEffect(() => {
    document.title = 'BASIC Laboratory | Profile';
  }, []);

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        User Profile
      </Typography>
      <Avatar>
        {context.user.nama
          .split(' ')
          .map(n => n[0])
          .join('')
          .substring(0, 2)}
      </Avatar>
    </Fragment>
  );
};

export default withStyles(style, { withTheme: true })(Profile);
