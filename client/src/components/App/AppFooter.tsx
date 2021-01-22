import React from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;

export const AppFooter = () => {
  const date = new Date();

  return (
    <Footer style={{textAlign: 'center'}}>
      <p style={{ marginBottom: 0 }}>Copyright ©{date.getFullYear()}</p>
      <p style={{ marginBottom: 0 }}>Created by some Concordia Students</p>
    </Footer>
  );
}
