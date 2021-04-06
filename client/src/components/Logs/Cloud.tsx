import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { setFiles, setLinks, addLink } from '../../store/slices/DropboxSlice';
import { Card, Button } from 'antd';
import { ResponsiveTable } from '../ResponsiveTable';
import { Dropbox } from 'dropbox';
import { UploadAuditButton } from './UploadAuditButton.js';

export const Cloud = () => {
  const dispatch = useDispatch();
  const files = useSelector((state : RootState) => state.dropbox.files);
  const links = useSelector((state : RootState) => state.dropbox.links);
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
      dispatch(setLinks([]));
      files.forEach((file : any)=> {
        dropbox.filesGetTemporaryLink({
          path: file['path_lower']
        }).then(res => {
          dispatch(addLink(res.result.link));
        })
      });
    });
  }, [updated])

  const getFiles = () => {
    let filesCopy = JSON.parse(JSON.stringify(files));
    let rows : any[] = [];

    filesCopy.forEach((file : any, index : number) => {
      rows.push({
        name: file['name'],
        action: 
            <a href={links[index]}>
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

  return(
    <div>
      <Card>
        <ResponsiveTable columns={columns} values={getFiles()} />
      </Card>
      <UploadAuditButton />
    </div>
  );
}