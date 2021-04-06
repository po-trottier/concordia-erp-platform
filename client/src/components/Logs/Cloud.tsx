import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setFiles } from '../../store/slices/DropboxSlice';
import { Card } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import { Dropbox } from 'dropbox';
import { UploadAuditButton } from './UploadAuditButton.js';

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
    });
  }, [updated])

  const getFiles = () => {
    let filesCopy = JSON.parse(JSON.stringify(files));
    let rows : any[] = [];

    filesCopy.forEach((file : any) => {
      rows.push({
        name: file['name'],
      });
    });
    return rows;
  }

  return(
    <div>
      <Card>
        <ResponsiveTable columns={{name: 'Name'}} values={getFiles()} />
      </Card>
      <UploadAuditButton />
    </div>
  );
}