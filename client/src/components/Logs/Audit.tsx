import React from 'react';
import { jsPDF } from 'jspdf';
import { Button, Card, Checkbox, DatePicker, Divider, Menu, Popover, Select, Typography } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

export const Audit = () => {

  const getNames = () => {
    let names : { name : string }[] = [
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
      <Menu.Item onClick={() => exportPDF()}>
        PDF
      </Menu.Item>
      <Menu.Item onClick={() => exportCSV()}>
        CSV
      </Menu.Item>
    </Menu>
  );

  const dummyData : any[] = [
    {
      date: new Date(),
      author: "Radley",
      action: "Create",
      target: "15 tires"
    },
    {
      date: new Date(),
      author: "John",
      action: "Deletes",
      target: "15 tires"
    }
  ]

  const exportPDF = () => {
    const date = new Date();
    const fileName = 'Audit-' + (date.toDateString() + ' ' + date.toLocaleTimeString()).replace(/\s/g, '-');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [8.5, 11],
    });
    doc.setFontSize(16);
    doc.text('Audit Generated ' + date.toDateString() + ' ' + date.toLocaleTimeString(), 1, 1);
    let lineNum = 1.5;
    doc.setFontSize(12);
    dummyData.forEach((object : any) => {
      const keys = Object.keys(object);
      const values = Object.values(object);
      keys.forEach((key : any, index : number) => {
        doc.text(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + values[index], 1, lineNum);
        lineNum += 0.2;
      });
      lineNum += 0.5;
    });
    doc.save(fileName + '.pdf');
  }

  const exportCSV = () => {
    const date = new Date();
    const fileName = 'Audit-' + (date.toDateString() + ' ' + date.toLocaleTimeString()).replace(/\s/g, '-');
    const csvRows : any[] = [];
    const headers = Object.keys(dummyData[0]);
    csvRows.push(headers.join(',').toUpperCase());
    dummyData.forEach((object : any) => {
      const values = Object.values(object);
      csvRows.push(values.join(','));
    });
    const file = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName + '.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

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
