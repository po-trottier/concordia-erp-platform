import React from 'react';
import {Button, Checkbox, Form, Select} from "antd";


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

  const actionOptions = ['Create', 'Modify', 'Delete'];
  const securityOptions = ['Successful Login', "Failed Login"]

  return (
      <Form {...layout} name="audit-form">
        <h2 {...title}>Global</h2>
        <Form.Item label="Action" name="action">
            <Checkbox.Group style={{textAlign: 'center'}} options={actionOptions}/>
        </Form.Item>
        <h2 {...title}>User</h2>
        <Form.Item name='name' label="Name">
            <Select
                showSearch
                style={{ width: 200 }}
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
        <h2 {...title}>Inventory</h2>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
  )
}

export default Audit;
