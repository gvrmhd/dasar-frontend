import React, { useContext, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { typography } from '@material-ui/system';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styled from 'styled-components';
import _ from 'lodash';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  LinearProgress
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';

import LogOutDialog from '../Dialogs/LogOutDialog';
import { AppContext } from '../../App';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  profileButton: {
    marginLeft: 12,
    marginRight: 12
  },
  hide: {
    display: 'none'
  },
  linearProg: {
    top: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(6)
    },
    [theme.breakpoints.up('xs')]: {
      top: theme.spacing(6)
    },
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(8)
    },
    left: 0,
    right: 0,
    zIndex: theme.zIndex.drawer - 1
  },
  lpFixed: {
    position: 'fixed'
  },
  lpAbsolute: {
    position: 'absolute'
  }
}));

const NavBar = ({ closeAll, open, setOpen }) => {
  // Get Root Context
  const context = useContext(AppContext);

  // MUI JSS hook
  const classes = useStyles();

  // Menu State
  const [anchorEl, setAnchor] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Check for drawer
  const drawer = _.isFunction(closeAll);

  const handleMenu = event => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const Box = styled.span`
    ${typography}
  `;

  return (
    <Fragment>
      <AppBar
        color='primary'
        position={drawer ? 'fixed' : 'relative'}
        className={classes.appBar}
      >
        <Toolbar disableGutters={true}>
          {drawer ? (
            open === false ? (
              <IconButton
                color='inherit'
                onClick={() => setOpen(true)}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <IconButton
                color='inherit'
                onClick={closeAll}
                className={classes.menuButton}
              >
                <ArrowBack />
              </IconButton>
            )
          ) : (
            <IconButton color='inherit' className={classes.menuButton} disabled>
              <MenuIcon />
            </IconButton>
          )}

          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant='h6' color='inherit' inline='true'>
              <Box fontWeight={700} inline>
                BASIC
              </Box>
              <Box fontWeight={400} inline>
                Lab
              </Box>
            </Typography>
          </Link>

          <div style={{ flexGrow: 1 }} />

          {context.logStatus ? (
            <Link
              to='/dash/profile'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Typography color='inherit' variant='subtitle1' noWrap>
                {'Hai, ' + _.head(_.words(context.user.nama))}
              </Typography>
            </Link>
          ) : (
            <Typography color='inherit' variant='subtitle1' noWrap>
              Silahkan Login
            </Typography>
          )}

          {/* --------------------------------- Profile Menu --------------------------------- */}
          <div>
            <IconButton
              aria-owns={openMenu ? 'menu-appbar' : undefined}
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
              className={classes.profileButton}
            >
              {!context.logStatus ? (
                <AccountCircle />
              ) : !context.user.is_asisten ? (
                <SupervisedUserCircle />
              ) : (
                <SupervisorAccount />
              )}
            </IconButton>

            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={openMenu}
              onClose={handleClose}
            >
              {!context.checkUser() ? (
                [
                  <MenuItem
                    key={'login'}
                    onClick={() => {
                      context.setLogin(true);
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                  </MenuItem>,

                  <MenuItem
                    key={'register'}
                    onClick={() => {
                      context.setRegister(true);
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <PersonAdd />
                    </ListItemIcon>
                    <ListItemText>Register</ListItemText>
                  </MenuItem>,

                  <MenuItem
                    key={'forgetpass'}
                    onClick={() => {
                      context.setForget(true);
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <SettingsBackupRestore />
                    </ListItemIcon>
                    <ListItemText>Lupa Password</ListItemText>
                  </MenuItem>
                ]
              ) : (
                <LogOutDialog close={handleClose} />
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <LinearProgress
        color='primary'
        className={classNames(classes.linearProg, {
          [classes.hide]: !context.loading,
          [classes.lpFixed]: drawer,
          [classes.lpAbsolute]: !drawer
        })}
      />
    </Fragment>
  );
};

export default NavBar;
