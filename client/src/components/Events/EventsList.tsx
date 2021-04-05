import React, { useEffect, useState } from 'react';
import { Card, Divider, Input } from 'antd';
import { EventEntry } from '../../interfaces/EventEntry';
import axios from '../../plugins/Axios';
import { setUserList } from '../../store/slices/UserListSlice';
import { getRoleString } from '../../router/Roles';

const { Search } = Input;

export const EventsList = () => {
  const emptyEvents : { name:string, id:string }[] = [];
  const emptyListeners : EventEntry[] = [];
  const [eventList, setEventList] = useState(emptyEvents);
  const [listenerList, setListenerList] = useState(emptyListeners);
  const [searchValue, setSearchValue] = useState('');
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdated(true);
    axios.get('events').then(({ data }) => {
      setListenerList(data);
    });
    axios.get('events/all').then(({ data }) => {
      setEventList(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return (
    <div>
      <Card>
        <Search
          placeholder='Search for an event'
          style={{ marginBottom: 18 }} />
        {
          listenerList.length > 0 ?
            listenerList.map((l) => {
              const event = eventList.find((e) => e.id === l.eventId);
              return (
                <div key={l._id}>
                  <b><p>{event ? event.name : 'UNKNOWN EVENT'}</p></b>
                  <p>Customers: {l.customerId.map((u) => u.name).join(', ')}</p>
                  <p>Users: {l.userId.map((u) => u.firstName).join(', ')}</p>
                  <p>Role: {l.role ? getRoleString(l.role) : ''}</p>
                  <Divider />
                </div>
              );
            }) :
            <span>No events were found.</span>
        }
      </Card>
    </div>
  );
};
