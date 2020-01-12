import React from 'react';
import Scrollable from 'hide-scrollbar-react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

import imej from '../../Assets/placeholder.png';
import NavBar from '../Utils/NavBar';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default () => {
  const classes = useStyles();

  React.useEffect(() => {
    document.title = 'BASIC Laboratory';
  }, []);

  return (
    <Scrollable style={{ height: '100vh' }}>
      <CssBaseline />
      <NavBar />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
            >
              Basic Laboratory
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='textSecondary'
              paragraph
              className={classes.sambutan}
            >
              Selamat datang kepada mahasiswa dan mahasiswi STT-PLN, Lab Dasar
              merupakan Lab komputer yang digunakan untuk mempelajari berbagai
              matakuliah pada bidang informatika. Dikhususkan dalam mempelajari
              Bahasa pemrograman.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Link to='/dash' style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary'>
                      Halaman Dashboard
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/dash/materi' style={{ textDecoration: 'none' }}>
                    <Button variant='outlined' color='primary'>
                      Download Materi
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={imej}
                    title='Image title'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          BASIC LABORATORY
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='textSecondary'
          component='p'
        >
          Copyright © 2016-2017-2018
        </Typography>
      </footer>
      {/* End footer */}
    </Scrollable>
  );
}
