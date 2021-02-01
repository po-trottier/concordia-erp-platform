import React from 'react';
import {Route, useHistory} from 'react-router-dom';
import {RouteGuard} from '../../router/RouteGuards';
import {NoPermissions} from '../../pages/NoPermissions';
import {Button, Card, Checkbox, DatePicker, Dropdown, Form, Menu, Select, Space} from "antd";

const LogList = () => {

  const action = 'action'
  const author = 'author'
  const target = 'target'
  const date = 'date'

  function getLogs(){
    let logs = [{

    },{

    }];

    return <h1>hey</h1>
  }

  return (
    <div>{getLogs}</div>
  )
}

export default LogList;
