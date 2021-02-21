import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Input, message } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import axios from '../../plugins/Axios'
import { UserEntry } from '../../interfaces/UserEntry';
import { getRoleString } from '../../router/RouteGuards';

const { Search } = Input;

export const UserList = () => {

  const getColumns = () => ({
    name: 'Name',
    username : 'Username',
    email: 'Email',
    roleString: 'Role',
    actions: 'Actions'
  });


  const emptyData : UserEntry[] = [];
  const defaultUser : UserEntry = {
    username: '',
    name: '',
    role: 0
  };

  const [tableData, setTableData] = useState(emptyData);
  const [searchValue, setSearchValue] = useState('');
  const [deleteVisible, setDeleteVisible] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(false);
  const [editLoading, setEditLoading] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(defaultUser);

  const editUser = (user : UserEntry) => {
    setEditLoading(true);
    axios.patch('/users/' + user.username)
      .catch((err) => {
        message.error('Something went wrong while editing the user.');
        console.error(err);
      })
      .then((resp) => {
        message.success('User was edited successfully.');
        const table = tableData;
        const index = table.indexOf(user);
        if (index !== -1 && resp) {
          table[index].username = resp.data.username;
          table[index].name = resp.data.name;
          table[index].role = resp.data.role;
        }
        setTableData(table);
      })
      .finally(() => {
        setEditVisible(false);
        setEditLoading(false);
      });
  };

  const deleteUser = (user : UserEntry) => {
    setDeleteLoading(true);
    axios.delete('/users/' + user.username)
      .catch((err) => {
        message.error('Something went wrong while deleting the user.');
        console.error(err);
      })
      .then(() => {
        message.success('User was deleted successfully.');
        const data = tableData;
        const index = data.indexOf(user);
        if (index !== -1) {
          data.splice(index, 1);
        }
        setTableData(data);
      })
      .finally(() => {
        setDeleteVisible(false);
        setDeleteLoading(false);
      });
  };

  useEffect(() => {
    let rows = [];
    axios.get('users').then(({data}) => {
      rows = data;
      if (searchValue.trim() !== '') {
        rows = rows.filter(
           (r : UserEntry) => r.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
      }
      rows.forEach((user : UserEntry) => {
        // TODO Remove email and use the backend value
        user.email = "temp@gmail.com";
        user.roleString = getRoleString(user.role);
        user.actions = (
          <div>
            <Button
              type="primary"
              size="small"
              style={{ marginRight: 8, width: 60 }}
              onClick={() => {
                setSelectedUser(user);
                setEditVisible(true);
              }}>
              Edit
            </Button>
            <Button
              type="ghost"
              size="small"
              style={{ width: 60 }}
              onClick={() => {
                setSelectedUser(user);
                setDeleteVisible(true);
              }}>
              Delete
            </Button>
          </div>
        );
      })
      setTableData(rows);
    });

    }, [searchValue]);

  const onSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Card>
        <Search
          placeholder='Search for a user'
          onChange={onSearch}
          style={{ marginBottom: 18 }} />
        {
          tableData.length > 0 ?
            <ResponsiveTable rows={tableData} cols={getColumns()} /> :
            <span>No users were found.</span>
        }
      </Card>
      <Modal
        title="Edit User"
        visible={editVisible}
        confirmLoading={editLoading}
        onOk={() => editUser(selectedUser)}
        onCancel={() => setEditVisible(false)}>
        <p>TODO: Edit User</p>
      </Modal>
      <Modal
        title="Delete User"
        visible={deleteVisible}
        confirmLoading={deleteLoading}
        onOk={() => deleteUser(selectedUser)}
        onCancel={() => setDeleteVisible(false)}>
        <p>Are you sure you want to delete the user &quot;{selectedUser.username}&quot;?</p>
      </Modal>
    </div>
  );
};
