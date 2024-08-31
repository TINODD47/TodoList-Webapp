import { useEffect, useState } from 'react';
import * as React from 'react';
import { TextField, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function TodoForm({ buttonText = 'Submit', formTitle = 'Add New Todo',
  formValues = {
    task: '', status: 'New', startdate: '', duedate: '', description: '', completed: false
  },
  open = false, onClose, handleAdd }) {
  const [formData, setFormData] = useState(formValues);

  const statusList = [
    'New',
    'Working',
    'Completed',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name == "status") {
      if (value == 'Completed') {
        setFormData({
          ...formData,
          'completed': true,
          [name]: value
        })
      }
      else setFormData({
        ...formData,
        'completed': false,
        [name]: value
      })
    }
  }

  const handleDateChange = (name, value) => {
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    handleAdd(formData)
    onClose()
    setFormData({
      task: '',
      status: '',
      startdate: '',
      duedate: '',
      description: '',
      completed: false
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              label="Title"
              name="task"
              value={formData.task}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                defaultValue={formData.status}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label='Status'
                name='status'
                onChange={handleChange}
              >
                {statusList.map((data) => (
                  <MenuItem
                    key={data}
                    value={data}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="Start Date"
                  format="DD/MM/YYYY"
                  onChange={(dateValue) => { handleDateChange('startdate', dateValue.toDate()) }}
                  defaultValue={dayjs(formData.startdate)}
                />
                <DatePicker
                  label="Due Date"
                  format="DD/MM/YYYY"
                  // defaultValue={dayjs("2024/08/22")}
                  onChange={(dateValue) => { handleDateChange('duedate', dateValue.toDate()) }}
                  name='startdate'
                  defaultValue={dayjs(formData.duedate)}
                />
              </DemoContainer>
            </FormControl>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
            />
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {buttonText}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}

export default TodoForm;