import React, { useEffect, useState } from 'react';
import { Button, Card, message, Modal } from 'antd';
import { LogEntry } from '../../interfaces/LogEntry';
import { ResponsiveTable } from '../ResponsiveTable';
import axios from '../../plugins/Axios';

export const LogList = () => {
  const emptyData : LogEntry[] = [];
  const [rows, setRows] = useState(emptyData);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const clearLogs = () => {
    Modal.confirm({
      onOk() {
        setLoading(true);
        axios.delete('/audits')
          .then(() => {
            message.success('The logs were cleared successfully.');
          })
          .catch((err) => {
            message.error('The logs were cleared successfully.');
            console.error(err);
          })
          .finally(() => {
            setLoading(false);
            return false;
          })
      },
      title: 'Clear the Logs',
      content: 'Are you sure you want to clear the logs?'
    });
  }

  const getColumns = () => ({
    module: 'Module',
    action: 'Action',
    date: 'Date',
    target: 'Target',
    author: 'Author',
  });

  return (
    <div style={{ paddingTop: 24 }}>
      {
        rows.length > 0 ? (
          <Card>
            <ResponsiveTable values={rows} columns={getColumns()} />
            <Button
              type='ghost'
              style={{ float: 'right', marginTop: 24 }}
              loading={loading}
              onClick={clearLogs}>
              Clear Logs
            </Button>
          </Card>
        ) : <span>No logs were found.</span>
      }
    </div>
  );
};
