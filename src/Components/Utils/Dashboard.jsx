import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Scrollable from 'hide-scrollbar-react';
import { AppContext } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import ResetPasswordDialog from '../Dialogs/ResetPasswordDialog';

// ------------------------- Core -------------------------
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// ------------------------- Icons -------------------------
import Code from '@material-ui/icons/Code';
import Input from '@material-ui/icons/Input';
import School from '@material-ui/icons/School';
import ListAlt from '@material-ui/icons/ListAlt';
import Settings from '@material-ui/icons/Settings';
import Visibility from '@material-ui/icons/Visibility';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import OpenInBrowser from '@material-ui/icons/OpenInBrowser';
import SettingsEthernet from '@material-ui/icons/SettingsEthernet';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';

import NavBar from './NavBar';

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
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
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
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
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  listIcon: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1)
    }
  },
  listText: {
    textDecoration: 'none'
  },
  nested: {
    paddingLeft: theme.spacing(4)
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
    right: 0
  },
  avatar: {
    margin: '-8px',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main
  }
}));

const Dashboard = ({ children }) => {
  // Get Root Context
  const context = useContext(AppContext);

  // Drawer State
  const [open, setOpen] = useState(false);

  // Dropdown State
  const [download, setDownload] = useState(false);
  const [upload, setUpload] = useState(false);
  const [tambah, setTambah] = useState(false);

  //Reset Password Dialog State
  const [dialog, setDialog] = useState(false);

  // Close Drawer & Dropdown
  const closeAll = () => {
    setOpen(false);
    setDownload(false);
    setUpload(false);
    setTambah(false);
  };

  // Material UI JSS
  const classes = useStyles();

  return (
    <Scrollable style={{ height: '100vh' }}>
      <NavBar open={open} setOpen={setOpen} closeAll={closeAll} />
      <div
        className={classNames('hideScroll', classes.root)}
        classes={classNames('hideScroll', classes.root)}
      >
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
                  <ListItem
                    button
                    onClick={() => context.loadingDialog.set(true)}
                  >
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
                  <ListItem button onClick={() => setDialog(true)}>
                    <ListItemIcon className={classes.listIcon}>
                      <SettingsBackupRestore />
                    </ListItemIcon>
                    <ListItemText primary='Reset Password' />
                  </ListItem>
                </Tooltip>

                <ResetPasswordDialog
                  open={dialog}
                  setOpen={setDialog}
                  nim={context.user.nim}
                />
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
                    <Link
                      to='/dash/matkul'
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <ChevronRight />
                        </ListItemIcon>
                        <ListItemText primary='Mata Kuliah' />
                      </ListItem>
                    </Link>
                  </List>

                  <List component='div' disablePadding>
                    <Link
                      to='/dash/kelas'
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <ChevronRight />
                        </ListItemIcon>
                        <ListItemText primary='Kelas' />
                      </ListItem>
                    </Link>
                  </List>

                  <List component='div' disablePadding>
                    <Link
                      to='/dash/users'
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <ChevronRight />
                        </ListItemIcon>
                        <ListItemText primary='User' />
                      </ListItem>
                    </Link>
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
    </Scrollable>
  );
};

export default Dashboard;
