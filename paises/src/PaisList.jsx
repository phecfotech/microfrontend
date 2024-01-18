import React, { useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import EditModal from "./EditModal.jsx";
import DeleteModal from './DeleteModal.jsx';
import axios from 'axios';
import { baseURL } from './config.js';

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
  const [paises, setPaises] = useState('');

  useEffect(() => {
    axios.get(baseURL).then((response) =>{
      setPaises(response.data);
    })
  },[]);
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid getRowId={(row) => row.id}
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