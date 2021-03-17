import { HTMLProps } from 'react';

export interface TableProps extends HTMLProps<HTMLDivElement> {
  columns : object,
  values : object[],
}