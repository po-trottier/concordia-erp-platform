import React, { useEffect, useState } from 'react'

import axios from '../app/Axios'

export const Dashboard = () => {

  const [status, setStatus] = useState(['Unknown']);

  useEffect(() => {
    axios.get('/')
      .then(({data}) => {
        setStatus(data.status);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <h1>Current API Status: <b>{status}</b></h1>
  )
}
