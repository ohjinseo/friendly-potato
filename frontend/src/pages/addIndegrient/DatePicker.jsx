import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


export default function MaterialUIPickers({ title }) {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <Stack style={{"width":"150px"}} spacing={1}>
    <MobileDatePicker
          label={title}
          inputFormat="YYYY / MM / DD"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}