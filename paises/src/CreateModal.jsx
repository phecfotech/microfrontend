import * as React from 'react';
import { TextField, Alert, Snackbar, FormControlLabel, Switch, FormGroup, FormControl, FormLabel,
Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { baseURL } from './config';
import axios from 'axios';
import { useState } from 'react';

export default function CreateModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [population, setPopulation] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [module, setModule] =useState({
    importador: false,
    exportador: false, 
    GDP: false,
  });
 
  const handleSwitch =(event) =>{
    setModule({
    ...module, 
    [event.target.name]:event.target.checked,
    })
  }

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

  const createPost = async () => {
    try {
      const response = await axios.post(baseURL, {
        name: name,
        population: population,
        module: module,
      });

      if (response.status === 201) {
        setAlertOpen(true);
        setOpen(false);
      } else {
        console.error('Error creating post. Status:', response.status);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" sx={{ margin: '10px' }} onClick={handleClickOpen}>
        CREAR
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Crear</DialogTitle>
        <DialogContent>
          <div
            className="Content"
            sx={{ '&.MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" value={name} onChange={(e) => setName(e.target.value)} sx={{ margin: '15px' }} label="Name" variant="standard" />
            <TextField
              id="standard-basic"
              value={population}
              onChange={(e) => setPopulation(e.target.value)}
              sx={{ margin: '15px' }}
              label="Population"
              variant="standard"
            />
            <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Modulo</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={module.importador} onChange={handleSwitch} name="importador" />
          }
          label="Importador"
        />
        <FormControlLabel
          control={
            <Switch checked={module.exportador} onChange={handleSwitch} name="exportador" />
          }
          label="Exportador"
        />
        <FormControlLabel
          control={
            <Switch checked={module.GDP} onChange={handleSwitch} name="GDP" />
          }
          label="GDP"
        />
      </FormGroup>
    </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              createPost();
              setModule()
            }}
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={alertOpen} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity='success'>
        El item se creó exitosamente!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
