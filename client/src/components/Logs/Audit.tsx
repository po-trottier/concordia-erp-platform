import React, {useEffect, useState} from 'react';
import { jsPDF } from 'jspdf';
import { Button, Card, Checkbox, DatePicker, Divider, Menu, Popover, Select, Typography } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import axios from "../../plugins/Axios";
import {setUserList} from "../../store/slices/UserListSlice";
import {RootState} from "../../store/Store";
import {UserEntry} from "../../interfaces/UserEntry";

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

export const Audit = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state : RootState) => state.userList.list);
  const [updated, setUpdated] = useState(false);
  const [actionFilter, setActionFilter] = useState([]);
  const [securityFilter, setSecurityFilter] = useState([]);
  const [materialFilter, setMaterialFilter] = useState([]);
  const [partFilter, setPartFilter] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [userFilter, setUserFilter] = useState([]);

  const setDates = (e : any) => {
    if (e) {
      setStartDate(e[0]._d);
      setEndDate(e[1]._d);
    }
  }

  useEffect(() => {
    setUpdated(true);
    axios.get('users').then(({ data }) => {
      dispatch(setUserList(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

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
      <Menu.Item onClick={() => getAudit()}>
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
    },
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
    },
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
    },
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
    },
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
    },
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
      target: "15 tires",
      something: 'helllloooo',
    },
  ]

  const exportPDF = async() => {
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
      lineNum += 0.3;
      if (lineNum > 10){
        doc.addPage([8.5, 11], 'portrait');
        lineNum = 1;
      }
    });
    doc.save(fileName + '.pdf');
  }

  const exportCSV = async() => {
    const data = await getAudit();
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

  const getAudit = () => {
    console.log(actionFilter);
    console.log(startDate);
    console.log(endDate);
    console.log(userFilter);
    console.log(securityFilter);
    console.log(materialFilter);
    console.log(partFilter);
    console.log(productFilter);
  }

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Title level={4}>Global Filters</Title>
        <p style={style}>Select the kind of action to query:</p>
        <Checkbox.Group onChange={(e : any) => setActionFilter(e)} options={actionOptions} />
        <p style={style}>Select the time range for which to query:</p>
        <RangePicker
          onChange={(e : any) => setDates(e)}
          style={{ maxWidth: 400 }}
          showTime={{ format: 'HH:mm' }}
          format='YYYY-MM-DD HH:mm' />

        <Divider />

        <Title level={4}>User Filters</Title>
        <p style={style}>Select the users to query:</p>
        <Select
          style={{ width: 400 }}
          onChange={(e : any) => setUserFilter(e)}
          showSearch
          allowClear
          mode='multiple'
          placeholder='Select users'
          optionFilterProp='children'>
          {
            userList.map((user: UserEntry) => (
              <Option
                key={user._id}
                value={user.username}>
                {user.firstName + ' ' + user.lastName}
              </Option>)
            )
          }
        </Select>
        <p style={style}>Select the kind of action to query:</p>
        <Checkbox.Group onChange={(e : any) => setSecurityFilter(e)} options={securityOptions} />

        <Divider />

        <Title level={4}>Inventory Filters</Title>
        <p style={style}>Select the materials to query:</p>
        <Checkbox.Group onChange={(e : any) => setMaterialFilter(e)} options={materialsOptions} />
        <p style={style}>Select the product parts to query:</p>
        <Checkbox.Group onChange={(e : any) => setPartFilter(e)} options={partsOptions} />
        <p style={style}>Select the products:</p>
        <Checkbox.Group onChange={(e : any) => setProductFilter(e)} options={productsOptions} />
      </Card>
      <Popover content={exportOptions} title='Save As' trigger='click'>
        <Button
          type='primary'
          onClick={e => e.preventDefault()}>
          Generate Audit
        </Button>
      </Popover>
    </div>
  );
};
