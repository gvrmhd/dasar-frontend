import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AppContext } from '../App';
import { withStyles } from '@material-ui/core/styles';
import { typography } from '@material-ui/system';
import styled from 'styled-components';
// ------------------------- Core -------------------------
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
// ------------------------- Icons -------------------------
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ListAlt from '@material-ui/icons/ListAlt';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import Input from '@material-ui/icons/Input';
import School from '@material-ui/icons/School';
import SettingsEthernet from '@material-ui/icons/SettingsEthernet';
import Code from '@material-ui/icons/Code';
import Settings from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import People from '@material-ui/icons/People';
import Visibility from '@material-ui/icons/Visibility';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';

import LogOutDialog from './Dialogs/LogOutDialog';
import _ from 'lodash';

const drawerWidth = 220;

const styles = theme => ({
  '@global': {
    'html, body, #root': {
      height: '100%'
    }
  },
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   width: `calc(100% - ${drawerWidth}px)`,
  //     transition: theme.transitions.create(['width', 'margin'], {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.enteringScreen
  //     })
  // },
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
  drawer: {
    overflow: 'auto',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  // Content Body Class Style :
  content: {
    // flexGrow: 1,
    height: `calc(100% - ${theme.spacing.unit * 5})`,
    padding: theme.spacing.unit * 3
  },
  listIcon: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit
    }
  },
  listText: {
    textDecoration: 'none'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  lightTooltip: {
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 15
  },
  paper: {
    flexGrow: 1
  },
  linearProg: {
    position: 'fixed',
    top: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing.unit * 8
    },
    left: 0,
    right: 0
  },
  avatar: {
    margin: '-8px',
    // height: '25px',
    // width: '25px'
    // padding: '-10px'
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main
    // height: 'calc(100% - 10px)'
  }
});

const Dashboard = ({ classes, children }) => {
  // Get Root Context
  const context = useContext(AppContext);

  // Drawer State
  const [open, setOpen] = useState(false);

  // Dropdown State
  const [download, setDownload] = useState(false);
  const [upload, setUpload] = useState(false);
  const [tambah, setTambah] = useState(false);

  // Menu State
  const [anchorEl, setAnchor] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Close Drawer & Dropdown
  const closeAll = () => {
    setOpen(false);
    setDownload(false);
    setUpload(false);
    setTambah(false);
  };

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
      <LinearProgress
        color='primary'
        className={classNames(classes.linearProg, {
          [classes.hide]: !context.loading
        })}
      />
      <div className={classNames('hideScroll', classes.root)}>
        <AppBar
          color='primary'
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={true}>
            {open === false ? (
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
                  // <Avatar className={classes.avatar}>
                  //   {context.user.nama
                  //     .split(' ')
                  //     .map(n => n[0])
                  //     .join('')
                  //     .substring(0, 1)}
                  // </Avatar>
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

        {/* --------------------------------- Drawer Menu --------------------------------- */}

        <Drawer
          variant='permanent'
          className={classNames(classes.drawer, 'hideScroll', {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: classNames('hideScroll', {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar} />

          <Divider />
          <List>
            {/* Download Menu : Materi, Laporan */}

            <Tooltip
              title={open ? '' : 'Download'}
              placement='right'
              classes={{ tooltip: classes.lightTooltip }}
            >
              <ListItem
                button
                onClick={() => {
                  setDownload(i => !i);
                  setOpen(true);
                }}
              >
                <ListItemIcon className={classes.listIcon}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Download' />
                {download ? <ArrowDropUp /> : <ArrowDropDown />}
              </ListItem>
            </Tooltip>

            <Collapse in={download} timeout='auto' unmountOnExit>
              <Link
                to='/dash/materi'
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ChevronRight />
                  </ListItemIcon>
                  <ListItemText primary='Materi' />
                </ListItem>
              </Link>

              <Link
                to='/dash/laporan'
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ChevronRight />
                  </ListItemIcon>
                  <ListItemText primary='Laporan' />
                </ListItem>
              </Link>
            </Collapse>

            {/* View Dosen */}

            <Tooltip
              title={open ? '' : 'View Dosen'}
              placement='right'
              classes={{ tooltip: classes.lightTooltip }}
            >
              <ListItem button onClick={() => context.isLoading(true)}>
                <ListItemIcon className={classes.listIcon}>
                  <Visibility />
                </ListItemIcon>
                <ListItemText primary='View Dosen' />
              </ListItem>
            </Tooltip>

            {/* Koding */}

            <Tooltip
              title={open ? '' : 'Contoh Kode'}
              placement='right'
              classes={{ tooltip: classes.lightTooltip }}
            >
              <ListItem button onClick={() => context.isLoading(false)}>
                <ListItemIcon className={classes.listIcon}>
                  <Code />
                </ListItemIcon>
                <ListItemText primary='Contoh Kode' />
              </ListItem>
            </Tooltip>
          </List>

          {/* --------------------------------- User --------------------------------- */}

          {context.checkUser() ? (
            <Fragment>
              <Divider />
              <List>
                {/* Upload : Tugas, Ujian */}

                <Tooltip
                  title={open ? '' : 'Upload'}
                  placement='right'
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <ListItem
                    button
                    onClick={() => {
                      setUpload(i => !i);
                      setOpen(true);
                    }}
                  >
                    <ListItemIcon className={classes.listIcon}>
                      <OpenInBrowser />
                    </ListItemIcon>
                    <ListItemText primary='Upload' />
                    {upload ? <ArrowDropUp /> : <ArrowDropDown />}
                  </ListItem>
                </Tooltip>

                <Collapse in={upload} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ChevronRight />
                      </ListItemIcon>
                      <ListItemText primary='Tugas' />
                    </ListItem>
                  </List>

                  <List component='div' disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ChevronRight />
                      </ListItemIcon>
                      <ListItemText primary='Ujian' />
                    </ListItem>
                  </List>
                </Collapse>

                <Tooltip
                  title={open ? '' : 'Nilai Laporan'}
                  placement='right'
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <ListItem button>
                    <ListItemIcon className={classes.listIcon}>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary='Nilai Laporan' />
                  </ListItem>
                </Tooltip>

                <Tooltip
                  title={open ? '' : 'Reset Password'}
                  placement='right'
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <ListItem button>
                    <ListItemIcon className={classes.listIcon}>
                      <SettingsBackupRestore />
                    </ListItemIcon>
                    <ListItemText primary='Reset Password' />
                  </ListItem>
                </Tooltip>
              </List>
            </Fragment>
          ) : null}

          {/* --------------------------------- Asisten --------------------------------- */}

          {context.user.is_asisten ? (
            <Fragment>
              <Divider />
              <List>
                {/* Tambah : Materi, Laporan, Mata Kuliah, Kelas  */}

                <Tooltip
                  title={open ? '' : 'Pengaturan'}
                  placement='right'
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <ListItem
                    button
                    onClick={() => {
                      setTambah(i => !i);
                      setOpen(true);
                    }}
                  >
                    <ListItemIcon className={classes.listIcon}>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary='Pengaturan' />
                    {tambah ? <ArrowDropUp /> : <ArrowDropDown />}
                  </ListItem>
                </Tooltip>

                <Collapse in={tambah} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ChevronRight />
                      </ListItemIcon>
                      <ListItemText primary='Materi' />
                    </ListItem>
                  </List>

                  <List component='div' disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ChevronRight />
                      </ListItemIcon>
                      <ListItemText primary='Laporan' />
                    </ListItem>
                  </List>

                  <List component='div' disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ChevronRight />
                      </ListItemIcon>
                      <ListItemText primary='Mata Kuliah' />
                    </ListItem>
                  </List>

                  <List component='div' disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ChevronRight />
                      </ListItemIcon>
                      <ListItemText primary='Kelas' />
                    </ListItem>
                  </List>

                  <List component='div' disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ChevronRight />
                      </ListItemIcon>
                      <ListItemText primary='Jadwal' />
                    </ListItem>
                  </List>
                </Collapse>

                {/* Input Nilai */}

                <Tooltip
                  title={open ? '' : 'Input Nilai'}
                  placement='right'
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <ListItem button>
                    <ListItemIcon className={classes.listIcon}>
                      <Input />
                    </ListItemIcon>
                    <ListItemText primary='Input Nilai' />
                  </ListItem>
                </Tooltip>

                {/* Edit Jadwal */}

                <Tooltip
                  title={open ? '' : 'Rekap Nilai'}
                  placement='right'
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <ListItem button>
                    <ListItemIcon className={classes.listIcon}>
                      <ListAlt />
                    </ListItemIcon>
                    <ListItemText primary='Rekap Nilai' />
                  </ListItem>
                </Tooltip>

                {/* Edit Kode */}

                <Tooltip
                  title={open ? '' : 'Edit Kode'}
                  placement='right'
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <ListItem button>
                    <ListItemIcon className={classes.listIcon}>
                      <SettingsEthernet />
                    </ListItemIcon>
                    <ListItemText primary='Edit Kode' />
                  </ListItem>
                </Tooltip>

                {/* Daftar User */}

                <Tooltip
                  title={open ? '' : 'Daftar User'}
                  placement='right'
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <ListItem button>
                    <ListItemIcon className={classes.listIcon}>
                      <People />
                    </ListItemIcon>
                    <ListItemText primary='Daftar User' />
                  </ListItem>
                </Tooltip>
              </List>
            </Fragment>
          ) : null}
        </Drawer>

        {/* Application Page Content : */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Dashboard);
