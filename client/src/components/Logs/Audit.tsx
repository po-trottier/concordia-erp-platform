import React from 'react';
import {Button, Card, Checkbox, DatePicker, Dropdown, Form, Menu, Select, Space} from "antd";



const Audit = () => {
  const layout = {
      align: 'left',
      textAlign: 'center',
      labelCol: {
          span: 2,
      },
      wrapperCol: {
          span: 8,
      },
  };

  const title = {
      align: 'left',
      labelCol: {
          span: 2,
      },
      fontWeight: 'bold',

  }

  const { RangePicker } = DatePicker;

  function onChange() {

  }

  function onOk() {

  }

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

  const actionOptions = ['Create', 'Modify', 'Delete'];
  const securityOptions = ['Successful Login', "Failed Login"]
  const materialsOptions = ['Steel', "Titanium", "Rubber", "Lubricant"]
  const manufacturedGoodsOptions = ['Frames', "Tires", "Handlebars", "Chains"]

  return (
      <Form {...layout} name="audit-form">
          <Card>
              <h2 {...title}>Global</h2>
              <Form.Item label="Action" name="action">
                  <Checkbox.Group options={actionOptions}/>
              </Form.Item>
          </Card>
          <Card>
              <h2 {...title}>User</h2>
              <Form.Item name='name' label="Name">
                  <Select
                      showSearch
                      style={{ width: 150 }}
                      placeholder="Select a person"
                      optionFilterProp="children"
                      // onChange={onChange}
                      // onFocus={onFocus}
                      // onBlur={onBlur}
                      // onSearch={onSearch}
                      // filterOption={(input, option) =>
                      //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      // }
                  >
                  </Select>
              </Form.Item>
              <Form.Item label="Security" name="security">
                  <Checkbox.Group options={securityOptions}/>
              </Form.Item>
          </Card>
          <Card>
              <h2 {...title}>Inventory</h2>
              <Form.Item label="Materials" name="materials">
                  <Checkbox.Group style={{textAlign: 'center'}} options={materialsOptions}/>
              </Form.Item>
              <Form.Item label="Manufactured Goods" name="manufacturedGoods">
                  <Checkbox.Group style={{textAlign: 'center'}} options={manufacturedGoodsOptions}/>
              </Form.Item>
          </Card>
          <Card>
              <h2 {...title}>Setting</h2>
              <Form.Item label="Date" name="date">
                  <Space direction="vertical" size={12}>
                      <RangePicker
                          showTime={{ format: 'HH:mm' }}
                          format="YYYY-MM-DD HH:mm"
                          onChange={onChange}
                          onOk={onOk}
                      />
                  </Space>
              </Form.Item>
          </Card>
          <Form.Item style={{alignItems: 'center', justifyContent:'center'}}>
              <Form.Item style = {{padding: '2%', fontWeight: 'bold'}} name='create_audit' label="Create Audit">
                  <Dropdown overlay={exportOptions}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                          Export as
                      </a>
                  </Dropdown>
              </Form.Item>
          </Form.Item>
      </Form>
  )
}

export default Audit;
