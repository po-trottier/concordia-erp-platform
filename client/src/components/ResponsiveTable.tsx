import React from 'react';

import { TableProps } from '../interfaces/TableProps';
import '../styles/tables.css';

export const ResponsiveTable = (props : TableProps) => {

  const { columns, values, ...rest } = props;

  const getColumns = () => {
    const cols = Object.entries(columns).map(([key, val]) => {
      return (
        <th key={key}>{val}</th>
      );
    });
    cols.unshift(<th key={'key'} />);
    return (
      <tr>{cols}</tr>
    );
  };

  const getRows = () => {
    return values.map((row, index) => {
      const vals = Object.entries(columns).map(([key, col]) => {
        return (
          <td key={key + index} data-label={col}>
            {row[key as keyof object] !== undefined ? row[key as keyof object] : <i>?</i>}
          </td>
        );
      });
      vals.unshift(<td key={'key' + index}>{index + 1}</td>);
      return (
        <tr key={'row' + index.toString()}>{vals}</tr>
      );
    });
  };

  return (
    <div {...rest}>
      <div style={{ overflowX: 'auto' }}>
        <table className='responsive-table'>
          <thead>
          {getColumns()}
          </thead>
          <tbody>
          {getRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};