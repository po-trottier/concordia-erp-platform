import React from 'react';

import {TableProps} from '../interfaces/TableProps';
import '../styles/tables.css';

export const ResponsiveTable = (props : TableProps) => {

  const getColumns = () => {
    const columns = Object.entries(props.cols).map(([key, val]) => {
      return (
        <th key={key}>{val}</th>
      );
    });
    columns.unshift(<th key={'key'} />)
    return (
      <tr>{columns}</tr>
    );
  };

  const getRows = () => {
    return props.rows.map((row, index) => {
      const values = Object.entries(props.cols).map(([key, col]) => {
        return (
          <td key={key + index} data-label={col}>{row[key as keyof object]}</td>
        );
      });
      values.unshift(<td key={'key' + index}>{ index + 1 }</td>);
      return (
        <tr key={'row' + index.toString()}>{values}</tr>
      );
    })
  };

  return (
    <table className="responsive-table">
      <thead>
        {getColumns()}
      </thead>
      <tbody>
        {getRows()}
      </tbody>
    </table>
  );
}