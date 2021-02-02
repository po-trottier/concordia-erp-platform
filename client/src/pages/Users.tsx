import React from "react";
import {UserList} from "../components/Users/UserList";
import {Button} from 'antd';

export const Users = () => {
  return (
    <div>
      <Button type="primary" >Add User</Button>
      <UserList/>
    </div>
  );
}
