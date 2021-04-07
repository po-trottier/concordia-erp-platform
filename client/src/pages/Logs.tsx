import React, { useState } from 'react';
import { Menu } from 'antd';
import { FunnelPlotTwoTone, SafetyCertificateTwoTone, DropboxOutlined } from '@ant-design/icons';

import { Audit } from '../components/Logs/Audit';
import { LogList } from '../components/Logs/LogList';
import { useDropboxChooser } from 'use-dropbox-chooser';

export const Logs = () => {

  const [tableState, setTableState] = useState('summary');

  let updateState = (e : any) => {
    setTableState(e.key);
  };

  let renderSection = () => {
    switch (tableState) {
      case 'audit':
        return <Audit />;
      case 'logs':
        return <LogList />;
      default:
        return <Audit />;
    }
  };

  const { open, isOpen } = useDropboxChooser({
    appKey: process.env.REACT_APP_APP_KEY,
    chooserOptions: { multiselect: false, linkType: 'preview' },
    onSelected: (files : any) => {
      handleSuccess(files);
    }
  });

  const handleSuccess = (files : any[]) => {
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', files[0].link);
    a.setAttribute('target', '_blank');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div>
      <Menu onClick={updateState} defaultSelectedKeys={['audit']} mode='horizontal'>
        <Menu.Item key='audit' icon={<FunnelPlotTwoTone twoToneColor='#52c41a' />}>
          Audit
        </Menu.Item>
        <Menu.Item key='logs' icon={<SafetyCertificateTwoTone twoToneColor='#eb2f96' />}>
          All Logs
        </Menu.Item>
        <Menu.Item
        icon={<DropboxOutlined
        style={{color: "#4E89FF"}} />}
        onClick={open}
        disabled={isOpen}>
          Dropbox
        </Menu.Item>
      </Menu>
      {renderSection()}
    </div>
  );
};