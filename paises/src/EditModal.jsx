import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function EditModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <div className='Content' sx={{'&.MuiTextField-root':{m:1, width:'25ch'},}}
            noValidate
        autoComplete='off'>
          
          <TextField id="standard-basic" sx={{margin:'15px'}} label="Name" variant="standard"/>
          <TextField id="standard-basic" sx={{margin:'15px'}} label="Population" variant="standard"/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}