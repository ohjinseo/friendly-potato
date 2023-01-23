import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants({setStorage, storage}) {

  const handleChange = (event) => {
    setStorage(event.target.value);
  };

  return (
    <div>
      <FormControl style={{"marginBottom":"20px"}} variant="standard" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">보관장소</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={storage}
          onChange={handleChange}
                  label="Sort By"
        >
          <MenuItem value={`냉장`}>냉장</MenuItem>
          <MenuItem value={`냉동`}>냉동</MenuItem>
          <MenuItem value={`실온`}>실온</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}