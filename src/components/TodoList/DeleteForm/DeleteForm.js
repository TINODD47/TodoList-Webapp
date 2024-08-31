import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteFormComp({ open, onClose, deleteTask, setOpenAlert }) {
    const [value, setValue] = React.useState('');

    const handleChange = (e) => {
        setValue(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();
        deleteTask()
        // setOpenAlert(true)
        onClose()
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        // event.preventDefault();
                        handleSubmit(event)
                    },
                }}
            >
                <DialogTitle >Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Type 'DELETE' to confirm your deletion
                    </DialogContentText>
                    <TextField
                        onChange={handleChange}
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="type here"
                        label="Type here"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="error" type="submit"
                        disabled={value == 'DELETE' ? false : true}
                    >Confirm</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}