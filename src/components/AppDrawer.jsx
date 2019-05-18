import React, { useState, Fragment } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SubdirectoryArrowRight from '@material-ui/icons/SubdirectoryArrowRight';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ListAlt from '@material-ui/icons/ListAlt';
import AddBox from '@material-ui/icons/AddBox';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import Input from '@material-ui/icons/Input';
import SettingsEthernet from '@material-ui/icons/SettingsEthernet';
import Code from '@material-ui/icons/Code';
import Visibility  from '@material-ui/icons/Visibility';  
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const drawerWidth = 220;

const styles = theme => ({
  '@global': {
    'html, body, #root': {
      height: '100%'
    }
  },
  root: {
    height: '100%',
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
    height: `calc(100% - 100px)`,
    padding: theme.spacing.unit * 3
  },
  listIcon: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 8
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  lightTooltip: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 15
  }
});

const Header = props => {
  const { classes } = props;

  // Drawer State
  const [open, setOpen] = useState(false);

  // Dropdown State
  const [download, setDownload] = useState(false);
  const [upload, setUpload] = useState(false);
  const [tambah, setTambah] = useState(false);

  // Menu State
  // const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchor] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Close Drawe & Dropdown
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

  return (
    <Fragment>
      <div className={classes.root}>
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
                onClick={() => closeAll()}
                className={classes.menuButton}
              >
                <ArrowBack />
              </IconButton>
            )}

            <Typography
              variant='h6'
              color='inherit'
              noWrap
              style={{ flexGrow: 1 }}
            >
              Basic Laboratory
            </Typography>

            <Typography color='inherit' variant='subtitle1' noWrap>201631202</Typography>

            <div>
              <IconButton
                aria-owns={openMenu ? 'menu-appbar' : undefined}
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
                className={classes.profileButton}
              >
                <AccountCircle />
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
                <MenuItem onClick={handleClose}>Login</MenuItem>
                <MenuItem onClick={handleClose}>Register</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: classNames({
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
                {download ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Tooltip>

            <Collapse in={download} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SubdirectoryArrowRight />
                  </ListItemIcon>
                  <ListItemText primary='Materi' />
                </ListItem>
              </List>

              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SubdirectoryArrowRight />
                  </ListItemIcon>
                  <ListItemText primary='Laporan' />
                </ListItem>
              </List>
            </Collapse>

            {/* View Dosen */}

            <Tooltip
              title={open ? '' : 'View Dosen'}
              placement='right'
              classes={{ tooltip: classes.lightTooltip }}
            >
              <ListItem button>
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
              <ListItem button>
                <ListItemIcon className={classes.listIcon}>
                  <Code />
                </ListItemIcon>
                <ListItemText primary='Contoh Kode' />
              </ListItem>
            </Tooltip>
          </List>

          {/* --------------------------------- User --------------------------------- */}

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
                {upload ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Tooltip>

            <Collapse in={upload} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SubdirectoryArrowRight />
                  </ListItemIcon>
                  <ListItemText primary='Tugas' />
                </ListItem>
              </List>

              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SubdirectoryArrowRight />
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
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary='Nilai Laporan' />
              </ListItem>
            </Tooltip>
          </List>

          {/* --------------------------------- Asisten --------------------------------- */}

          <Divider />
          <List>
            {/* Tambah : Materi, Laporan, Mata Kuliah, Kelas  */}
            <Tooltip
              title={open ? '' : 'Tambahkan'}
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
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary='Tambahkan' />
                {tambah ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Tooltip>

            <Collapse in={tambah} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SubdirectoryArrowRight />
                  </ListItemIcon>
                  <ListItemText primary='Materi' />
                </ListItem>
              </List>

              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SubdirectoryArrowRight />
                  </ListItemIcon>
                  <ListItemText primary='Laporan' />
                </ListItem>
              </List>

              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SubdirectoryArrowRight />
                  </ListItemIcon>
                  <ListItemText primary='Mata Kuliah' />
                </ListItem>
              </List>

              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <SubdirectoryArrowRight />
                  </ListItemIcon>
                  <ListItemText primary='Kelas' />
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

            {/* Ubah Kode */}

            <Tooltip
              title={open ? '' : 'Ubah Kode'}
              placement='right'
              classes={{ tooltip: classes.lightTooltip }}
            >
              <ListItem button>
                <ListItemIcon className={classes.listIcon}>
                  <SettingsEthernet />
                </ListItemIcon>
                <ListItemText primary='Ubah Kode' />
              </ListItem>
            </Tooltip>

            {/* Ubah Jadwal */}

            <Tooltip
              title={open ? '' : 'Ubah Jadwal'}
              placement='right'
              classes={{ tooltip: classes.lightTooltip }}
            >
              <ListItem button>
                <ListItemIcon className={classes.listIcon}>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary='Ubah Jadwal' />
              </ListItem>
            </Tooltip>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
