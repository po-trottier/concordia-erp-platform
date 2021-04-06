import React from 'react';
import DropboxChooser from 'react-dropbox-chooser';
import { useDispatch, useSelector } from 'react-redux';
import { setFiles, setLinks, addLink } from '../../store/slices/DropboxSlice';
import { Dropbox } from 'dropbox';
import { Button } from 'antd';

export const UploadAuditButton = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.dropbox.files);
  const links = useSelector((state) => state.dropbox.links);
  const dropbox = new Dropbox({
    accessToken: 'oQ2YpqFmtFEAAAAAAAAAASVGkjlXl1afaVGSJsSPg0KeMdHWJFhH4p-Y4HkNltxm',
    fetch: window.fetch.bind(window),
  });

  const handleSuccess = (files) => {
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', files[0].link);
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handleCancel = () => {
    dropbox.filesListFolder({
      path: '',
    }).then(res => {
      dispatch(setFiles(res.result.entries));
      dispatch(setLinks([]));
      files.forEach(file => {
        dropbox.filesGetTemporaryLink({
          path: file['path_lower']
        }).then(res => {
          dispatch(addLink(res.result.link));
        })
      });
      console.log(links);
    });
  }

  return(
    <div style={{marginTop: 16}}>
      <DropboxChooser
        appKey={'bi2msqa4xuxy011'}
        multiselect={false}
        success={handleSuccess}
        cancel={handleCancel}
        extensions={['.pdf', '.csv']}>
          <Button type='primary'>Open Dropbox Chooser</Button>
      </DropboxChooser>
    </div>
  );
}