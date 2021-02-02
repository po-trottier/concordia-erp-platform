import React from 'react';
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
    <ResponsiveTable rows={getRows()} cols={getColumns()} />
  )
}

export default LogList;
