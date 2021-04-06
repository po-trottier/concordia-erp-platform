import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setFiles } from '../../store/slices/Dropbox';
import { Button, Card } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import { Dropbox } from 'dropbox';
import { UploadAuditButton } from './UploadAuditButton';

export const Cloud = () => {
  const dispatch = useDispatch();
  const files = useSelector((state : RootState) => state.dropbox.files);
  const updated = useSelector((state : RootState) => state.dropbox.updated);

  const dropbox = new Dropbox({
    accessToken: 'oQ2YpqFmtFEAAAAAAAAAASVGkjlXl1afaVGSJsSPg0KeMdHWJFhH4p-Y4HkNltxm',
    fetch: window.fetch.bind(window),
  });

  useEffect(() => {
    dropbox.filesListFolder({
      path: '',
    }).then(res => {
      dispatch(setFiles(res.result.entries));
      console.log(files);
    })
  }, [updated])

  const getFiles = () => {
    let filesCopy = JSON.parse(JSON.stringify(files));
    let rows : any[] = [];

    filesCopy.forEach((file : any) => {
      rows.push({
        name: file['name'],
        download: <Button>Download</Button>,
        delete: <Button>Delete</Button> 
      });
    });

    return rows;
  }

  const filesColumns = {
    name: 'Name',
    download: 'Download',
    delete: 'Delete'
  };

  return(
    <div>
      <Card>
        <ResponsiveTable columns={filesColumns} values={getFiles()} />
      </Card>
      <UploadAuditButton dropbox={dropbox} />
    </div>
  );
}