import React from 'react';
import { EventsList } from '../components/Events/EventsList';
import { AddEventModal } from '../components/Events/AddEventModal';

export const Events = () => {
  return (
    <div>
      <EventsList />
      <AddEventModal />
    </div>
  );
};