import React from 'react';
import { Button, Card, Checkbox, DatePicker, Divider, Menu, Popover, Select, Typography } from 'antd';

import { PersonName } from '../../interfaces/PersonName';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

export const Audit = () => {

  const getNames = () => {
    let names : PersonName[] = [
      { name: 'Mike' },
      { name: 'Alex' },
    ];
    return names.map((personName) => (
      <Option
        key={personName.name}
        value={personName.name}>
        {personName.name}
      </Option>),
    );
  };

  const actionOptions = ['Create', 'Modify', 'Delete'];
  const securityOptions = ['Successful Login', 'Failed Login'];
  const materialsOptions = ['Steel', 'Titanium', 'Rubber', 'Lubricant'];
  const partsOptions = ['Frames', 'Tires', 'Handlebars', 'Chains'];
  const productsOptions = ['Hybrid Bike', 'Street Bike', 'Mountain Bike'];

  const style = {
    marginBottom: 4,
    marginTop: 16,
    color: '#919191',
  };

  const exportOptions = (
    <Menu>
      <Menu.Item>
        PDF
      </Menu.Item>
      <Menu.Item>
        CSV
      </Menu.Item>
      <Menu.Item>
        TXT
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Title level={4}>Global Filters</Title>
        <p style={style}>Select the kind of action to query:</p>
        <Checkbox.Group options={actionOptions} />
        <p style={style}>Select the time range for which to query:</p>
        <RangePicker
          style={{ maxWidth: 400 }}
          showTime={{ format: 'HH:mm' }}
          format='YYYY-MM-DD HH:mm' />

        <Divider />

        <Title level={4}>User Filters</Title>
        <p style={style}>Select the users to query:</p>
        <Select
          style={{ width: 400 }}
          showSearch
          allowClear
          mode='multiple'
          placeholder='Select users'
          optionFilterProp='children'>
          {getNames()}
        </Select>
        <p style={style}>Select the kind of action to query:</p>
        <Checkbox.Group options={securityOptions} />

        <Divider />

        <Title level={4}>Inventory Filters</Title>
        <p style={style}>Select the materials to query:</p>
        <Checkbox.Group options={materialsOptions} />
        <p style={style}>Select the product parts to query:</p>
        <Checkbox.Group options={partsOptions} />
        <p style={style}>Select the products:</p>
        <Checkbox.Group options={productsOptions} />
      </Card>
      <Popover content={exportOptions} title='Export Options' trigger='click'>
        <Button
          type='primary'
          onClick={e => e.preventDefault()}>
          Generate Audit
        </Button>
      </Popover>
    </div>
  );
};
