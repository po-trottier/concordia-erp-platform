import React, { useEffect } from 'react';
import { Card, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addFile, removeFile } from '../../store/slices/DropboxSlice';
import { ResponsiveTable } from '../ResponsiveTable';
import { Dropbox as Dbx } from 'dropbox';
import DropboxChooser from 'react-dropbox-chooser';

export const Dropbox = () => {
  const dispatch = useDispatch();
  const files = useSelector(state => state.dropbox.files);
  const updated = useSelector(state => state.dropbox.updated);

  const dbx = new Dbx({
    accessToken: 'oQ2YpqFmtFEAAAAAAAAAASVGkjlXl1afaVGSJsSPg0KeMdHWJFhH4p-Y4HkNltxm',
    fetch: window.fetch.bind(window),
  });

  useEffect(() => {
    getFiles();
  }, [updated]);

  const getFiles = () => {
    dbx.filesListFolder({
      path: '',
    }).then(res => {
      res.result.entries.forEach(file => {
        dbx.filesGetTemporaryLink({
          path: file['path_lower']
        }).then(res => {
          dispatch(addFile({
            id: file['id'],
            name: file['name'],
            path: file['path_lower'],
            link: res.result.link
          }));    
        });
      });
    });
  }

  const deleteFile = (path, id) => {
    dbx.filesDeleteV2({ path })
    .then(res => {
      console.log(res);
      dispatch(removeFile(id));
      message.success('File successfully deleted');
    })
    .catch(() => {
      message.error('File unsuccessfully deleted');
    });
  }

  const getRows = () => {
    let filesCopy = JSON.parse(JSON.stringify(files));
    let rows = [];
    filesCopy.forEach((file) => {
      rows.push({
        name: file['name'],
        download:
            <a href={file['link']}>
              <Button>
              Download
              </Button>
            </a>,
        delete: <Button onClick={() => deleteFile(file['path'], file['id'])}>Delete</Button>
      });
    });
    return rows;
  }

  const columns = {
    name: 'Name',
    download: 'Download',
    delete: 'Delete',
  }

  const handleSuccess = (files) => {
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', files[0].link);
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return(
    <div>
      <Card>
        <ResponsiveTable columns={columns} values={getRows()} />
      </Card>
      <DropboxChooser
        appKey={'bi2msqa4xuxy011'}
        multiselect={false}
        success={handleSuccess}
        cancel={getFiles}
        extensions={['.pdf', '.csv']}>
          <Button type='primary' style={{marginTop: 16}}>
            Open Dropbox Chooser
          </Button>
      </DropboxChooser>
    </div>
  );
}