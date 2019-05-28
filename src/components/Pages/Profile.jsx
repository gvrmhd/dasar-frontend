import React, { Fragment, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App';
import {
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper
} from '@material-ui/core';
import {
  Assignment,
  AssignmentInd,
  DateRange,
  Smartphone,
  HowToReg
} from '@material-ui/icons';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: blue[500]
  },
  paper: {
    padding: theme.spacing(0,2)
  },
  avatarWr: {
    paddingRight: theme.spacing(2) 
  }
}));

const Profile = props => {
  const context = useContext(AppContext);
  const classes = useStyles();

  const date = new Date(context.user.created_at).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    document.title = 'BASIC Laboratory | Profile';
    console.log(date);
  }, []);

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        User Profile
      </Typography>

      <Paper className={classes.paper}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar className={classes.avatarWr} >
              <Avatar className={classes.avatar}>
                <AssignmentInd />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Nama' secondary={context.user.nama} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar className={classes.avatarWr} >
              <Avatar className={classes.avatar}>
                <Assignment />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='No Induk' secondary={context.user.nim} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar className={classes.avatarWr} >
              <Avatar className={classes.avatar}>
                <Smartphone />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='No Handphone'
              secondary={context.user.no_hp}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar className={classes.avatarWr} >
              <Avatar className={classes.avatar}>
                <DateRange />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Tanggal Daftar' secondary={date} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemAvatar className={classes.avatarWr} >
              <Avatar className={classes.avatar}>
                <HowToReg />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Status'
              secondary={context.user.is_asisten ? 'Asisten' : 'User'}
            />
          </ListItem>
        </List>
      </Paper>
    </Fragment>
  );
};

export default Profile;
