import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import * as React from 'react';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';

interface DateRangePickerProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  name: string;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({ control, setValue, name }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={[null, null]}
        render={({ field }) => (
          <DateRangePicker
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
              setValue('startDate', newValue?.[0] ? newValue[0].toISOString() : null);
              setValue('endDate', newValue?.[1] ? newValue[1].toISOString() : null);
            }}
            enableAccessibleFieldDOMStructure={false}
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                sx: {
                  width: { xs: "100%", sm: "500px", md: "425px", lg: "500px" },
                  backgroundColor: 'rgba(245, 246, 248, 1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  height: '50px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(245, 246, 248, 1)',
                    borderRadius: '8px',
                    paddingRight: '0px',
                    height: '50px',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputAdornment-root': {
                    backgroundColor: 'rgba(21, 44, 91, 1)',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    height: '50px',
                    padding: '16px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& svg': {
                      color: 'white',
                      fontSize: '2rem',
                    },
                  },
                  '& .MuiInputBase-input': {
                    padding: '0px 16px',
                    color: 'rgba(21, 44, 91, 1)',
                    textAlign: 'center',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                },
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;