import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { baseURL } from './config';
import axios from 'axios';
import { useState} from 'react';

export default function CreateModal({setPaises}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const[population, setPopulation] =useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createPost = async() =>{
    try {
      const response = await axios.post(baseURL, {
        name: name,
        population: population
      });
      console.log(response);
      if(response.status ===201){
        setOpen(false);
      } else{
        console.error('Error creating post. Status:',response.status)
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
    };
    
  return (
    <React.Fragment>
      <Button variant="contained" sx={{margin:'10px'}} onClick={handleClickOpen}>
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
            <div className='Content' sx={{'&.MuiTextField-root':{m:1, width:'25ch'},}}
            noValidate
        autoComplete='off'>
          
          <TextField id="standard-basic" value={name} onChange={(e) =>setName(e.target.value)} sx={{margin:'15px'}} label="Name" variant="standard"/>
          <TextField id="standard-basic" value={population} onChange={(e) =>setPopulation(e.target.value)} sx={{margin:'15px'}} label="Population" variant="standard"/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={createPost} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}