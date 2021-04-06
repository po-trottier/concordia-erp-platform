import React from 'react';
import { Button, Card, message, Checkbox, DatePicker, Divider, Menu, Popover, Select, Typography, Row, Upload  } from 'antd';

export const UploadAuditButton = () => {

  return(
    <div>
      <Button
      type="primary"
      style={{ marginTop: 16 }}
      loading={false}
      onClick={() => {}}
      >
        Upload Audit
      </Button>
    </div>
  );
}