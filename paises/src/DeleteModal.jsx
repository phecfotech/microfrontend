import * as React from 'react';
import { Alert, Snackbar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { baseURL } from './config';
import axios from 'axios';
import { useState } from 'react';

export default function DeleteModal({ paisId }) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const deletePost = async () => {
    try {
      const response = await axios.delete(`${baseURL}/${paisId}`);

      if (response.status === 200) {
        setAlertOpen(true);
        setOpen(false);
      } else {
        console.error('Error deleting item. Status:', response.status);
        setDeleteError(`Error deleting item. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      setDeleteError(`Error deleting item: ${error.message}`);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" sx={{ margin: '10px' }} onClick={handleClickOpen}>
        DELETE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Borrar</DialogTitle>
        <DialogContent>
          <div className="Content" sx={{ '&.MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <h2>¿Estás seguro de eliminar este item?</h2>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              deletePost();
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
          El item se eliminó exitosamente!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
