import React from 'react';
import { Card, Input } from 'antd';

const { Search } = Input;

export const EventsList = () => {
  return (
    <div>
      <Card>
        <Search
          placeholder='Search for an event'
          style={{ marginBottom: 18 }} />
        {
            <span>No events were found.</span>
        }
      </Card>
    </div>
  );
};
