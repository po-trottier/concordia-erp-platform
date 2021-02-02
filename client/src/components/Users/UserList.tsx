import React from "react";
import {ResponsiveTable} from "../ResponsiveTable";
import {UserEntry} from "../../interfaces/UserEntry";


export const UserList = () => {

  const getColumns = () => ({
    name: 'Name',
    age: 'Age',
    location: 'Location',
    actions: 'Actions'
  });

  const getRows = (): UserEntry[] => ([
    {
      name: 'Pierre-Olivier Trottier',
      age: 23,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
    {
      name: 'Camil Bouzidi',
      age: 24,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
    {
      name: 'Radley Carpio',
      age: 23,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
    {
      name: 'Bicher Chammaa',
      age: 25,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
    {
      name: 'Matthew Kevork',
      age: 24,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
    {
      name: 'Cedric Martens',
      age: 22,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
    {
      name: 'William Morin-Laberge',
      age: 32,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
    {
      name: 'Adrien Tremblay',
      age: 23,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
    {
      name: 'Nimit Jaggi',
      age: 26,
      location: 'Montreal, Qc, Canada',
      actions: <div><a>Reset Password</a><p></p><a>Delete User</a></div>
    },
  ]);

  return (
    <ResponsiveTable rows={getRows()} cols={getColumns()}/>
  );
}
