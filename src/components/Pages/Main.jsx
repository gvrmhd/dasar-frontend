import React, { Fragment, useContext } from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { AppContext } from '../../App';

const style = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

const Main = props => {
  const context = useContext(AppContext);

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        {context.kata}
      </Typography>
      <Typography paragraph variant='body1'>Selamat Datang . . .</Typography>
    </Fragment>
  );
};

export default withStyles(style, { withTheme: true })(Main);
