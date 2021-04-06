import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setSelected } from '../../store/slices/UploadSlice';
import { setFiles } from '../../store/slices/Dropbox';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, message, Checkbox, DatePicker, Divider, Menu, Popover, Select, Typography, Row, Upload  } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { ResponsiveTable } from '../ResponsiveTable';
import { Dropbox } from 'dropbox';
import { UploadAuditButton } from './UploadAuditButton';

export const Cloud = () => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state : RootState) => state.upload.selectedFile);
  const files = useSelector((state : RootState) => state.dropbox.files);
  const updated = useSelector((state : RootState) => state.dropbox.updated);
  const extension = selectedFile && selectedFile.name.length > 20 ? '...' : '';

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

  const props = {
    maxCount: 1,
    showUploadList: false,
    beforeUpload: () => {
      return false;
    },
    onChange(info : UploadChangeParam) {
      if (info.file.size / 1024 / 1024 > 2) {
        message.error('The file is must be under 2MB.');
        return;
      }
      if (info.file) {
        // Clear the file upload error
        const fileError = document.getElementById('display-file-error');
        if (fileError) {
          fileError.style.display = 'none';
        }
      }
      dispatch(setSelected(info.file));
    }
  };

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
      <UploadAuditButton />
    </div>
  );
}