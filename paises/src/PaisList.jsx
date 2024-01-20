import React, { useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import EditModal from "./EditModal.jsx";
import DeleteModal from './DeleteModal.jsx';
import axios from 'axios';
import { baseURL } from './config.js';
import{Tooltip} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'population', headerName: 'Population', width: 200 },
  { field:'Edit', 
  renderCell: (cellValue)=>{
    return (<EditModal pais={cellValue.row}/>
    )
  }}, 
  {field:'Delete',
  renderCell:(cellValue)=>{
  return(
    <DeleteModal paisId={cellValue.row.id}/>
  )
}},
  {
    field: 'module',
    renderCell: (cellValue) => {
      const selectedModules = cellValue.row.module;
      const hasModules = Object.values(selectedModules).some((value) => value);

      let icon;
      let tooltipTitle;

      if (hasModules) {
        icon = <VisibilityIcon color='primary' />;
        tooltipTitle = `Módulos Habilitados: ${Object.keys(selectedModules)
          .filter((key) => selectedModules[key])
          .join(', ')}`;
      } else {
        icon = <VisibilityOffIcon color='primary' />;
        tooltipTitle = 'Sin Módulos Habilitados';
      }

      return (
        <Tooltip title={tooltipTitle}>
          <div>{icon}</div>
        </Tooltip>
      );
    },
  },
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