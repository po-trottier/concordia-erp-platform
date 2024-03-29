import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input } from 'antd';
import { EventEntry } from '../../interfaces/EventEntry';
import { getRoleString } from '../../router/Roles';
import { ResponsiveTable } from '../ResponsiveTable';
import { RootState } from '../../store/Store';
import { setListenerList } from '../../store/slices/ListenerListSlice';
import { setEventList } from '../../store/slices/EventListSlice';
import { EditEventModal } from './EditEventModal';
import axios from '../../plugins/Axios';

const { Search } = Input;

enum RecipientTypes {
  CUSTOMERS = 'Customers',
  USERS = 'Users',
  ROLES = 'Roles',
}

export const EventsList = () => {
  const dispatch = useDispatch();

  const listeners = useSelector((state : RootState) => state.listenerList.list);
  const events = useSelector((state : RootState) => state.eventList.list);

  const [updated, setUpdated] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setUpdated(true);
    axios.get('events').then(({ data }) => {
      dispatch(setListenerList(data));
    });
    axios.get('events/all').then(({ data }) => {
      dispatch(setEventList(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const getEvents = () => {
    let clone = JSON.parse(JSON.stringify(listeners));

    clone.forEach((l : EventEntry) => {
      const event = events.find((e : any) => e.id === l.eventId);
      l.eventName = event ? event.name : undefined;

      if (l.customerId && l.customerId.length > 0) {
        l.recipientType = RecipientTypes.CUSTOMERS;
      } else if (l.userId && l.userId.length > 0) {
        l.recipientType = RecipientTypes.USERS;
      } else if (l.role && l.role.length > 0) {
        l.recipientType = RecipientTypes.ROLES;
      }

      if (!l.recipientType) {
        return;
      }

      switch (l.recipientType) {
        case RecipientTypes.CUSTOMERS:
          l.recipients = l.customerId.map((u) => u.name).join(', ');
          break;
        case RecipientTypes.USERS:
          l.recipients = l.userId.map((u) => u.firstName + ' ' + u.lastName).join(', ');
          break;
        case RecipientTypes.ROLES:
          l.recipients = l.role.map((r) => getRoleString(r)).join(', ');
          break;
      }

      l.actions = (
        <EditEventModal event={l} />
      );
    });

    const eventMatch = (e : EventEntry) => e.eventName
      ? e.eventName.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
      : true;
    const recipientMatch = (e : EventEntry) => e.recipients
      ? e.recipients.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
      : true;
    if (searchValue.trim() !== '') {
      clone = clone.filter(
        (e : EventEntry) => eventMatch(e) || recipientMatch(e));
    }

    return clone.sort((a : EventEntry, b : EventEntry) => {
      if (!a.eventName || !b.eventName) {
        return 0;
      }
      const nameA = a.eventName.toUpperCase();
      const nameB = b.eventName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  const columns = {
    eventName: 'Action',
    recipientType: 'Recipient Type',
    recipients: 'Recipients',
    actions: 'Actions'
  };

  return (
    <div>
      <Card>
        <Search
          placeholder='Search for an event'
          style={{ marginBottom: 18 }}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }} />
        {
          getEvents().length > 0 ?
            <ResponsiveTable columns={columns} values={getEvents()} /> :
            <span>No events were found.</span>
        }
      </Card>
    </div>
  );
};
