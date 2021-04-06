import React, { useEffect } from 'react';
import { Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addFile } from '../../store/slices/DropboxSlice';
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
            link: res.result.link
          }));    
        });
      });
    });
  }

  const getRows = () => {
    let filesCopy = JSON.parse(JSON.stringify(files));
    let rows = [];
    filesCopy.forEach((file) => {
      rows.push({
        name: file['name'],
        action:
            <a href={file['link']}>
              <Button>
              Download
              </Button>
            </a>
      });
    });
    return rows;
  }

  const columns = {
    name: 'Name',
    action: 'Action'
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