import React, { Fragment, useContext, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import _ from 'lodash';

import ResetIcon from '@material-ui/icons/SettingsBackupRestore';
import Typography from '@material-ui/core/Typography';

import { AppContext } from '../../App'; 
import ResetPasswordDialog from '../Dialogs/ResetPasswordDialog';
import TableIcons from '../Utils/TableIcons';

const Users = () => {
  // Get Root Context
  const context = useContext(AppContext);
  // Table Columns
  const columns = [
    { title: 'NIM', field: 'nim', editable: 'never' },
    { title: 'Nama', field: 'nama' },
    {
      title: 'No. Telepon',
      field: 'no_hp'
    },
    {
      title: 'Status',
      field: 'status',
      lookup: { 1: 'Asisten', 0: 'Praktikan' }
    }
  ];

  // Local State
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nim, setNim] = useState('');

  const customDataParse = arr => {
    return arr.map(i => ({
      nim: i.nim,
      nama: i.nama,
      no_hp: i.no_hp,
      status: i.is_asisten ? 1 : 0
    }));
  };

  const getUsersData = () => {
    const token = localStorage.getItem('Token');

    if (!_.isEmpty(token)) {
      setLoading(true);

      const url = process.env.REACT_APP_API + '/mahasiswa/all';
      const headers = { Token: token };

      axios
        .request({ method: 'GET', url, headers })
        .then(res => {
          setLoading(false);

          if (res.data.status) {
            const parsed = customDataParse(res.data.data);
            console.log(parsed);
            setData(parsed);
          } else {
            context.snack({ msg: res.data.msg, type: 'error' });
            console.log(res.data);
          }
        })
        .catch(err => {
          setLoading(false);
          context.snack({ msg: 'Unable to Load Data', type: 'error' });
          console.error(err);
        });
    } else {
      console.log('No Token ...');
    }
  };

  useEffect(() => {
    document.title = 'BASIC Laboratory | Pengaturan User';
    /*eslint-disable-next-line*/ getUsersData();
  }, []);

  const updateHandler = (newData, oldData) =>
    new Promise(resolve => {
      var url = process.env.REACT_APP_API + '/mahasiswa/' + newData.nim;
      const params = { nama: newData.nama, no_hp: newData.no_hp };
      const token = localStorage.getItem('Token');
      const headers = { Token: token };

      axios
        .request({ method: 'PUT', url, params, headers })
        .then(res => {
          url = process.env.REACT_APP_API + '/mahasiswa/all';
          return axios.request({ method: 'GET', url, headers });
        })
        .then(res => {
          if (res.data.status) {
            const raw = res.data.data;
            const parsed = customDataParse(raw);
            setData(parsed);
          } else {
            context.snack({ msg: res.data.msg, type: 'error' });
            console.log(res.data);
          }

          resolve();
        })
        .catch(err => {
          context.snack({ msg: 'Edit Data Gagal', type: 'error' });
          console.error(err);
          resolve();
        });
    });

  const deleteHandler = oldData =>
    new Promise(resolve => {
      var url = process.env.REACT_APP_API + '/mahasiswa/' + oldData.nim;
      const token = localStorage.getItem('Token');
      const headers = { Token: token };

      axios
        .request({ method: 'DELETE', url, headers })
        .then(res => {
          url = process.env.REACT_APP_API + '/mahasiswa/all';
          return axios.request({ method: 'GET', url, headers });
        })
        .then(res => {
          if (res.data.status) {
            const raw = res.data.data;
            const parsed = customDataParse(raw);
            setData(parsed);
          } else {
            context.snack({ msg: res.data.msg, type: 'error' });
            console.log(res.data);
          }

          resolve();
        })
        .catch(err => {
          context.snack({ msg: 'Hapus Data Gagal', type: 'error' });
          console.log(err);
          resolve();
        });
    });

  const resetHandler = (event, rowData) => {
    setNim(rowData.nim);
    setOpen(true);
  };

  return (
    <Fragment>
      <Typography variant='h4' gutterBottom>
        Pengaturan User
      </Typography>

      <MaterialTable
        title='Daftar User Aktif'
        icons={TableIcons}
        columns={columns}
        data={data}
        isLoading={loading}
        actions={[
          {
            icon: ResetIcon,
            onClick: resetHandler,
            tooltip: 'Reset Password'
          }
        ]}
        editable={{
          onRowUpdate: updateHandler,
          onRowDelete: deleteHandler,
          isDeletable: rowData => rowData.nim !== context.user.nim
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
            editTooltip: 'Edit User',
            emptyDataSourceMessage: 'Data Tidak Ditemukan',
            editRow: {
              deleteText: 'Hapus User ini ?'
            }
          },
          toolbar: {
            searchPlaceholder: 'Cari User'
          },
          header: {
            actions: 'Opsi'
          }
        }}
      />

      <ResetPasswordDialog open={open} setOpen={setOpen} nim={nim} />
    </Fragment>
  );
};

export default Users;
