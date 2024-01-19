import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { baseURL } from './config';

export default function EditModal({ pais }) {
  const [open, setOpen] = React.useState(false);
  const [editedName, setEditedName] = React.useState('');
  const [editedPopulation, setEditedPopulation] = React.useState('');
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setEditedName(pais.name);
    setEditedPopulation(pais.population);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`${baseURL}/${pais.id}`, {
        name: editedName,
        population: editedPopulation,
      });

      if (response.status === 200) {
        setAlertOpen(true);
        setOpen(false);
      } else {
        console.error('Error editing item. Status:', response.status);
      }
    } catch (error) {
      console.error('Error editing:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        EDIT
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <div className="Content" sx={{ '&.MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              sx={{ margin: '15px' }}
              label="Name"
              variant="standard"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              sx={{ margin: '15px' }}
              label="Population"
              variant="standard"
              value={editedPopulation}
              onChange={(e) => setEditedPopulation(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => {
            handleEdit();
            setAlertOpen(true);
            }}  
            autoFocus
            >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={alertOpen} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity='success'>
        El item se editó exitosamente!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
