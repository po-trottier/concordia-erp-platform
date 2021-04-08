import React, {useEffect, useState} from 'react';
import {Button, message} from 'antd';
import { LogEntry } from '../../interfaces/LogEntry';
import { ResponsiveTable } from '../ResponsiveTable';
import axios from '../../plugins/Axios';
import {AuditDocument} from "../../../../server/dist/api/audits/schemas/audits.schema";
export const LogList = () => {
  const emptyData : LogEntry[] = []
  const [rows, setRows] = useState(emptyData);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    axios.get('/audits')
      .then((res) => {
        const rowsToDisplay: LogEntry[] = []
        res.data.forEach( (entry: AuditDocument) => {
          rowsToDisplay.push({
            module : entry.module,
            action : entry.action,
            date   : entry.date.toString(),
            target : entry.target,
            author : entry.author,
          })});
        setRows(rowsToDisplay);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  function getRows() {
    return rows;
  }

  const getColumns = () => ({
    module : 'Module',
    action : 'Action',
    date   : 'Date',
    target : 'Target',
    author : 'Author',
  });

  return (
    <div style={{ paddingTop: 24 }}>
      <ResponsiveTable values={rows} columns={getColumns()} />
      <Button type='ghost' style={{ float: 'right', marginTop: 24 }}>
        Clear Logs
      </Button>
    </div>
  );
};
