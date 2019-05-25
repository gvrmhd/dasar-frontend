import React, { Fragment, useContext, useEffect } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { typography } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationImportant } from '@material-ui/icons';
import { Typography, Paper, Grid, Divider } from '@material-ui/core';

import { AppContext } from '../../App';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2)
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  title: {
    display: 'inline',
    marginLeft: theme.spacing(1)
  },
  icon: {
    marginBottom: '-3px'
  },
  jadwalPaper: {
    marginTop: theme.spacing(1)
  },
  jadwalTitle: {
    textAlign: "center"
  }
}));

const Main = props => {
  const context = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    document.title = 'BASIC Laboratory | Beranda';
  }, []);

  const Box = styled.div`
    ${typography}
  `;

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        {context.kata}
      </Typography>

      <Grid container spacing={2} >
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <NotificationImportant className={classes.icon} />
            <Typography variant='h5' className={classes.title}>
              Peraturan
            </Typography>
            <Divider className={classes.divider} component='li' />
            <Typography>
              Harap seluruh praktikan untuk mematuhi tata tertib yang ada di
              dalam Laboratorium. Apabila didapati praktikan yang melanggar
              peraturan akan dikenakan sanksi oleh asisten yang berjaga.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <NotificationImportant className={classes.icon} />
            <Typography variant='h5' className={classes.title}>
              Pengumpulan Tugas
            </Typography>
            <Divider className={classes.divider} component='li' />
            <Typography>
              Tugas praktikum di lab dapat dikumpulkan melalui website ini.
              Silahkan <strong>Login</strong> , lalu gunakan menu{' '}
              <strong>Upload</strong> disebelah kiri website kemudian pilih
              tugas ataupun ujian. Ikuti langkah selanjutnya.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} >
        <Grid item xs={10}>
          <Paper className={classNames(classes.jadwalPaper, classes.paper)}>
            <Typography variant='h5' className={classes.jadwalTitle}>
              Jadwal Kuliah
            </Typography>
            <Divider className={classes.divider} component='li' />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Main;
