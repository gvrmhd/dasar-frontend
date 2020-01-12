import React, { Fragment, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import axios from 'axios';
// --------------------------------------------- Material UI Core ---------------------------------------------
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// --------------------------------------------- Material UI Icon ---------------------------------------------
import { AppContext } from '../../App';
import { getJadwal, getMatkul } from '../../FakeApi';
import TableIcons from '../Utils/TableIcons';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: theme.spacing(15)
  },
  title: {
    display: 'inline-block',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    marginRight: theme.spacing(3)
  },
  formControl: {
    marginTop: theme.spacing(2) + 2,
    minWidth: theme.spacing(35)
  },
  actionContainer: {
    marginRight: '1.5rem'
  },
  addButton: {
    float: 'right',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2)
  }
}));

// Table Columns
const columns = [
  { title: 'Kelas', field: 'kelas' },
  { title: 'Dosen', field: 'dosen' },
  { title: 'Hari', field: 'hari' },
  { title: 'Mulai', field: 'jam_mulai' },
  { title: 'Selesai', field: 'jam_selesai' },
  { title: 'Asisten', field: 'asisten' }
];

export default () => {
  // Get Root Context
  const context = useContext(AppContext);
  // MUI JSS
  const classes = useStyles();
  // Local State
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  // Custom Toolbar State
  const [val, setVal] = useState();

  const deleteHandler = oldData =>
    new Promise(resolve => {
      resolve();
    });

  const updateHandler = (oldData, newData) =>
    new Promise(resolve => {
      resolve();
    });

  const addHandler = newData =>
    new Promise(resolve => {
      resolve();
    });

  const fetchMatkul = () => {
    setLoading(true);
    getMatkul()
      .then(res => {
        setItem(res);
        setLoading(false);
      })
      .catch(err => {
        context.snack({ msg: err, type: 'error' });
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = 'BASIC Laboratory | Kelas';
    /*eslint-disable-next-line*/ fetchMatkul();
  }, []);

  useEffect(() => {
    setLoading(true);
    getJadwal(val)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [val]);

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        Pengaturan Kelas
      </Typography>

      <MaterialTable
        title='Daftar Kelas'
        icons={TableIcons}
        columns={columns}
        data={data}
        isLoading={loading}
        editable={{
          onRowDelete: deleteHandler,
          onRowAdd: addHandler,
          onRowUpdate: updateHandler
        }}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          }
        }}
        style={{ padding: '0 1rem' }}
        localization={{
          body: {
            deleteTooltip: 'Hapus User',
            emptyDataSourceMessage: 'Tidak ada kelas !',
            editRow: {
              deleteText: 'Hapus User ini ?'
            }
          },
          header: {
            actions: 'Opsi'
          }
        }}
        components={{
          Toolbar: props => (
            <Fragment>
              <Typography variant='body1' className={classes.title}>
                Pilih Matakuliah :
              </Typography>
              <FormControl className={classes.formControl}>
                <Select value={val} onChange={e => setVal(e.target.value)}>
                  {item.map((i, index) => (
                    <MenuItem key={index} value={i.kode_matkul}>
                      {i.nama}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <span className={classes.addButton}>
                <props.components.Actions
                  actions={
                    props.actions && props.actions.filter(a => a.isFreeAction)
                  }
                  components={props.components}
                />
              </span>
            </Fragment>
          )
        }}
      />
    </Fragment>
  );
};
