import React from "react";
import {ResponsiveTable} from "../ResponsiveTable";
import {UserEntry} from "../../interfaces/UserEntry";
import {UserActions} from "./UserActions";

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
      actions: UserActions
    },
    {
      name: 'Camil Bouzidi',
      age: 24,
      location: 'Montreal, Qc, Canada',
      actions: UserActions
    },
    {
      name: 'Radley Carpio',
      age: 23,
      location: 'Montreal, Qc, Canada',
      actions: UserActions
    },
    {
      name: 'Bicher Chammaa',
      age: 25,
      location: 'Montreal, Qc, Canada',
      actions: UserActions
    },
    {
      name: 'Matthew Kevork',
      age: 24,
      location: 'Montreal, Qc, Canada',
      actions: UserActions
    },
    {
      name: 'Cedric Martens',
      age: 22,
      location: 'Montreal, Qc, Canada',
      actions: UserActions
    },
    {
      name: 'William Morin-Laberge',
      age: 32,
      location: 'Montreal, Qc, Canada',
      actions: UserActions
    },
    {
      name: 'Adrien Tremblay',
      age: 23,
      location: 'Montreal, Qc, Canada',
      actions: UserActions
    },
    {
      name: 'Nimit Jaggi',
      age: 26,
      location: 'Montreal, Qc, Canada',
      actions: UserActions
    },
  ]);

  return (
    <ResponsiveTable rows={getRows()} cols={getColumns()}/>
  );
}
