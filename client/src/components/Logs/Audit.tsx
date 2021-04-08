import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button, Card, Checkbox, DatePicker, Menu, Popover, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setUserList } from '../../store/slices/UserListSlice';
import { RootState } from '../../store/Store';
import { UserEntry } from '../../interfaces/UserEntry';
import axios from '../../plugins/Axios';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

export const Audit = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state : RootState) => state.userList.list);

  const actionOptions = ['Create', 'Update', 'Delete'];

  const emptyModules : string[] = [];
  const [modules, setModules] = useState(emptyModules);
  const [updated, setUpdated] = useState(false);

  const [actions, setActions] = useState(['']);
  const [authors, setAuthors] = useState(['']);
  const [selectedModules, setSelectedModules] = useState(['']);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const setDates = (e : any) => {
    if (e) {
      setStartDate(e[0]._d);
      setEndDate(e[1]._d);
    }
  };

  useEffect(() => {
    setUpdated(true);
    axios.get('users').then(({ data }) => {
      dispatch(setUserList(data));
    });
    axios.get('/audits/modules')
      .then((res) => {
        setModules(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const style = {
    marginBottom: 4,
    marginTop: 24,
    color: '#919191',
  };

  const getAudit = async () => {
    const query : any = {
      module: selectedModules.join(),
      action: actions.join(),
      author: authors.join(),
      after: startDate.toLocaleDateString('en-US'),
      before: endDate.toLocaleDateString('en-US'),
    };

    let str = [];
    for (const prop in query) {
      if (query.hasOwnProperty(prop) && query[prop].length > 0) {
        str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(query[prop]));
      }
    }
    const queryString = str.join('&');

    const response = await axios.get('/audits/filter?' + queryString);
    const data : any[] = response.data;
    return data;
  };

  const exportPDF = async () => {
    const data = await getAudit();
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
    data.forEach((object : any) => {
      const keys = Object.keys(object);
      const values = Object.values(object);
      keys.forEach((key : any, index : number) => {
        doc.text(key.charAt(0).toUpperCase() + key.slice(1) + ': ' + values[index], 1, lineNum);
        lineNum += 0.2;
      });
      lineNum += 0.3;
      if (lineNum > 10) {
        doc.addPage([8.5, 11], 'portrait');
        lineNum = 1;
      }
    });
    doc.save(fileName + '.pdf');
  };

  const exportCSV = async () => {
    const data = await getAudit();
    const date = new Date();
    const fileName = 'Audit-' + (date.toDateString() + ' ' + date.toLocaleTimeString()).replace(/\s/g, '-');
    const csvRows : any[] = [];
    if (data && data.length > 0) {
      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(',').toUpperCase());
      data.forEach((object : any) => {
        const values = Object.values(object);
        csvRows.push(values.join(','));
      });
    }
    const file = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName + '.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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

  return (
    <div>
      <Card style={{ margin: '24px 0' }}>
        <Title level={4}>Filters</Title>
        <p>
          All filters are optional, use them to filter out the logs you do not need.
        </p>
        <p>
          Leaving filters empty will result in them being ignored.
        </p>
        <p style={style}>Select the kind of action to query:</p>
        <Checkbox.Group onChange={(e : any[]) => setActions(e)} options={actionOptions} />
        <p style={style}>Select the time range for which to query:</p>
        <RangePicker
          onChange={(e : any) => setDates(e)}
          style={{ maxWidth: 450, width: '100%' }}
          format='YYYY-MM-DD'
          defaultValue={[moment(startDate), moment(endDate)]}
          allowClear={false} />
        <p style={style}>Select the author(s) of the changes:</p>
        <Select
          style={{ maxWidth: 450, width: '100%' }}
          onChange={(e : any) => setAuthors(e)}
          showSearch
          allowClear
          mode='multiple'
          placeholder='Select author(s)'
          optionFilterProp='children'>
          {
            userList.map((user : UserEntry) => (
              <Option
                key={user._id}
                value={user.username}>
                {user.firstName + ' ' + user.lastName}
              </Option>)
            )
          }
        </Select>
        <p style={style}>Select the module(s) to query:</p>
        <Select
          style={{ maxWidth: 450, width: '100%' }}
          onChange={(e : any) => setSelectedModules(e)}
          showSearch
          allowClear
          mode='multiple'
          placeholder='Select module(s)'
          optionFilterProp='children'>
          {
            modules.map((module : string) => (
              <Option
                key={module}
                value={module}>
                {module}
              </Option>)
            )
          }
        </Select>
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
