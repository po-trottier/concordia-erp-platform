import React from 'react';
import {Button} from 'antd';

import {LogEntry} from "../../interfaces/LogEntry";
import {ResponsiveTable} from "../ResponsiveTable";

const LogList = () => {

  function getRows(){
    const rows: LogEntry[] = [{
        date: (new Date(2021,1,31,12,57)).toString(),
        action: 'Create',
        author: 'Mike',
        target: '15 tires'
      },
      {
        date: (new Date(2021,1,31,12,54)).toString(),
        action: 'Login Success',
        author: 'Mike',
        target: 'self'
      }
    ];
    return rows;
  }

  const getColumns = () => ({
    date: 'Date',
    action: 'Action',
    author: 'Author',
    target: 'Target'
  });



  return (
    <div style={{ paddingTop: 24 }}>
      <ResponsiveTable rows={getRows()} cols={getColumns()} />
      <Button type='ghost' style={{ float: 'right', marginTop: 24 }}>
        Clear Logs
      </Button>
    </div>
  )
}

export default LogList;
