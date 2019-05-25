import React, { Fragment, useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import { withStyles, Typography, Avatar } from '@material-ui/core';

const style = theme => ({});

const Profile = props => {
  const context = useContext(AppContext);

  useEffect(() => {
    document.title = 'BASIC Laboratory | Profile';

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(context.user.created_at).toLocaleDateString('id-ID', options);
    console.log(date);

  }, []);

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        User Profile
      </Typography>
      {context.user.created_at}
    </Fragment>
  );
};

export default withStyles(style, { withTheme: true })(Profile);
