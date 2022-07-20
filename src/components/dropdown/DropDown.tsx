import {FormControl, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React from 'react';

interface DropDownProps {
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: SelectChangeEvent<string>) => void;
  optionData: string[][];
  defaultValue: string;
}

export default function DropDown({
  handleChange,
  optionData,
  defaultValue,
}: DropDownProps) {
  return (
    <FormControl sx={{m: 1, minWidth: 120}} size="small">
      {optionData.length > 0 ? (
        <Select defaultValue={defaultValue} onChange={handleChange}>
          {optionData.map(option => (
            <MenuItem value={option[0] || ''} key={option[0]}>
              {option[1]}
            </MenuItem>
          ))}
        </Select>
      ) : null}
    </FormControl>
  );
}
