import React from 'react';
import DataTable from 'react-data-table-component';

const DataTableComponent = ({ data }) => {
    const Year = data.map(ev => ev['Model Year']);
    const BatteryRange = data.map(ev => ev['Electric Range']);

  const columns = [
    {
      name: 'Make',
      selector: row => row.Make,
      sortable: true,
    },
    {
      name: 'Model',
      selector: row => row.Model,
      sortable: true,
    },
    {
      name: 'Year',
      selector: row => row['Model Year'],
      sortable: true,
    },
    {
        name: 'Battery Range',
        selector: row => row['Electric Range'],
        sortable: true,
      },
    {
      name: 'City',
      selector: row => row.City,
    },
  ];

  console.log(data);

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      striped
    />
  );
};

export default DataTableComponent;
