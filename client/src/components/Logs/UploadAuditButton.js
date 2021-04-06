import React from 'react';
import DropboxChooser from 'react-dropbox-chooser';
import { useDispatch } from 'react-redux';
import { setFiles } from '../../store/slices/DropboxSlice';
import { Dropbox } from 'dropbox';

export const UploadAuditButton = (props) => {
  const dispatch = useDispatch();

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
    });
  }

  return(
    <div style={{marginTop: 16}}>
      <DropboxChooser
        appKey={'bi2msqa4xuxy011'}
        multiselect={false}
        success={handleSuccess}
        cancel={handleCancel}
      />
    </div>
  );
}