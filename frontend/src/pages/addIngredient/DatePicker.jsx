import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


export default function MaterialUIPickers({kind, createdAt, expiredAt, setCreatedAt, setExpiredAt, title }) {
  const [value, setValue] = React.useState(dayjs(Date.now()).format("YYYY-MM-DD"));

  const handleChange = (newValue) => {
    newValue = new Date(newValue);
    setValue(newValue);
    if (kind === "등록일") {
      setCreatedAt(newValue);
    } else {
      setExpiredAt(newValue);
    }
  };

  React.useEffect(() => {
    if (kind === "등록일") {
      setValue(createdAt);
    } else {
      setExpiredAt(expiredAt);
    }
  }, [])

  return (
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <Stack style={{"width":"150px"}} spacing={1}>
    <MobileDatePicker
          label={title}
          inputFormat="YYYY-MM-DD"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
