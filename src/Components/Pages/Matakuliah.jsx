import React, { Fragment, useContext, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { AppContext } from '../../App';
import TableIcons from '../Utils/TableIcons';

const columns = [
  {
    title: 'Kode Matakuliah',
    field: 'kode_matkul',
    editable: 'onAdd',
    editComponent: props => (
      <TextField
        type='text'
        value={props.value}
        placeholder='Kode Matakuliah'
        InputProps={{
          style: {
            fontSize: 13
          }
        }}
        onChange={e => props.onChange(e.target.value)}
      />
    )
  },
  {
    title: 'Nama Matakuliah',
    field: 'nama_matkul',
    editComponent: props => (
      <TextField
        type='text'
        value={props.value}
        placeholder='Nama Matakuliah'
        InputProps={{
          style: {
            fontSize: 13,
            width: '12rem'
          }
        }}
        onChange={e => props.onChange(e.target.value)}
      />
    )
  },
  {
    title: 'SKS',
    field: 'sks',
    editComponent: props => (
      <TextField
        type='number'
        value={props.value}
        placeholder='SKS'
        InputProps={{
          style: {
            fontSize: 13,
            width: '3rem'
          }
        }}
        onChange={e => props.onChange(e.target.value)}
      />
    )
  }
];

export default () => {
  // Get Root Context
  const context = useContext(AppContext);

  // Local State
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const getMatkulData = () => {
    const token = localStorage.getItem('Token');
    const url = process.env.REACT_APP_API + '/matakuliah/all';
    const headers = { Token: token };

    axios
      .request({ method: 'GET', url, headers })
      .then(res => {
        if (res.data.status) {
          setData(res.data.data);
        } else {
          throw res.data.message;
        }
        setLoad(false);
      })
      .catch(err => {
        setLoad(false);
        context.snack({ msg: 'Unable to Load Data', type: 'error' });
        console.error(err);
      });
  };

  const updateHandler = (newData, oldData) =>
    new Promise(resolve => {
      var url =
        process.env.REACT_APP_API + '/matakuliah/' + newData.kode_matkul;
      const params = { nama_matkul: newData.nama_matkul, sks: newData.sks };
      const token = localStorage.getItem('Token');
      const headers = { Token: token };

      axios
        .request({ method: 'PUT', url, params, headers })
        .then(res => {
          if (res.data.status) {
            url = process.env.REACT_APP_API + '/matakuliah/all';
            return axios.request({ method: 'GET', url, headers });
          } else {
            throw res.data.message;
          }
        })
        .then(res => {
          if (res.data.status) {
            setData(res.data.data);
          } else {
            throw res.data.message;
          }
          resolve();
        })
        .catch(err => {
          resolve();
          context.snack({ msg: 'Unable to Load Data', type: 'error' });
          console.error(err);
        });
    });

  const deleteHandler = oldData =>
    new Promise(resolve => {
      var url =
        process.env.REACT_APP_API + '/matakuliah/' + oldData.kode_matkul;
      const token = localStorage.getItem('Token');
      const headers = { Token: token };

      axios
        .request({ method: 'DELETE', url, headers })
        .then(res => {
          if (res.data.status) {
            url = process.env.REACT_APP_API + '/matakuliah/all';
            return axios.request({ method: 'GET', url, headers });
          } else {
            throw res.data.message;
          }
        })
        .then(res => {
          if (res.data.status) {
            setData(res.data.data);
          } else {
            throw res.data.message;
          }
          resolve();
        })
        .catch(err => {
          resolve();
          context.snack({ msg: 'Unable to Load Data', type: 'error' });
          console.error(err);
        });
    });

  const addHandler = newData =>
    new Promise(resolve => {
      var url = process.env.REACT_APP_API + '/matakuliah';
      const token = localStorage.getItem('Token');
      const headers = { Token: token };
      const params = { ...newData };

      axios
        .request({ method: 'POST', url, headers, params })
        .then(res => {
          if (res.data.status) {
            url = process.env.REACT_APP_API + '/matakuliah/all';
            return axios.request({ method: 'GET', url, headers });
          } else {
            throw res.data.message;
          }
        })
        .then(res => {
          if (res.data.status) {
            setData(res.data.data);
          } else {
            throw res.data.message;
          }
          resolve();
        })
        .catch(err => {
          resolve();
          context.snack({ msg: 'Unable to Load Data', type: 'error' });
          console.error(err);
        });
    });

  useEffect(() => {
    document.title = 'BASIC Laboratory | Daftar User';
    /*eslint-disable-next-line*/ getMatkulData();
  }, []);

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        Pengaturan Matakuliah
      </Typography>

      <MaterialTable
        title='Daftar Matakuliah'
        icons={TableIcons}
        columns={columns}
        data={data}
        isLoading={load}
        editable={{
          onRowUpdate: updateHandler,
          onRowDelete: deleteHandler,
          onRowAdd: addHandler
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
            emptyDataSourceMessage: 'Data Tidak Ditemukan',
            editRow: {
              deleteText: 'Hapus Matakuliah ?'
            }
          },
          toolbar: {
            searchPlaceholder: 'Cari Matakuliah'
          },
          header: {
            actions: 'Opsi'
          }
        }}
      />
    </Fragment>
  );
};
