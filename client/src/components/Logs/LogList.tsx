import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { LogEntry } from '../../interfaces/LogEntry';
import { ResponsiveTable } from '../ResponsiveTable';
import axios from '../../plugins/Axios';

export const LogList = () => {
  const emptyData : LogEntry[] = [];
  const [rows, setRows] = useState(emptyData);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    axios.get('/audits')
      .then((res) => {
        const rowsToDisplay : LogEntry[] = [];
        res.data.forEach((entry : LogEntry) => {
          rowsToDisplay.push({
            module: entry.module,
            action: entry.action,
            date: entry.date.toString(),
            target: entry.target,
            author: entry.author,
          });
        });
        setRows(rowsToDisplay);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const getColumns = () => ({
    module: 'Module',
    action: 'Action',
    date: 'Date',
    target: 'Target',
    author: 'Author',
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
