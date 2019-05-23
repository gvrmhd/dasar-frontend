import React, { Fragment, useContext, useEffect } from 'react';
import { typography } from '@material-ui/system';
import { withStyles, Typography, Paper, Grid } from '@material-ui/core';
import { AppContext } from '../../App';
import styled from 'styled-components';

const style = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  }
});

const Main = ({ classes }) => {
  const context = useContext(AppContext);

  useEffect(() => {
    document.title = 'BASIC Laboratory | Beranda';
  }, []);

  const Box = styled.span`
    ${typography}
  `;

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        {context.kata}
      </Typography>
      <Typography paragraph variant='body1'>
        Selamat Belajar !
      </Typography>

      <Paper className={classes.paper}>
        <Typography variant='h5'>Info - Peraturan</Typography>
        <Typography paragraph>
          Harap seluruh praktikan untuk mematuhi tata tertib yang ada di dalam
          Laboratorium. Apabila didapati praktikan yang melanggar peraturan akan
          dikenakan sanksi oleh asisten yang berjaga.
        </Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant='h5'>Info - Pengumpulan Tugas</Typography>
        <Typography paragraph>
          Tugas praktikum di lab dapat dikumpulkan melalui website ini, gunakan
          menu upload disebelah kiri website kemudian pilih tugas ataupun ujian.
          Ikuti langkah selanjutnya.
        </Typography>
      </Paper>
    </Fragment>
  );
};

export default withStyles(style, { withTheme: true })(Main);
