import React, { useState } from 'react'
import { paises } from './data.js';
import { DataGrid} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import EditModal from "./EditModal.jsx";
import DeleteModal from './DeleteModal.jsx';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'population', headerName: 'Population', width: 200 },
  {field:'Edit', 
  renderCell: (cellValue)=>{
    return (<EditModal/>
    )
  }},
  {field:'Delete',
renderCell:(cellValue)=>{
  return(
    <DeleteModal/>
  )

}}
  
];

export default function PaisList() {
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={paises}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}