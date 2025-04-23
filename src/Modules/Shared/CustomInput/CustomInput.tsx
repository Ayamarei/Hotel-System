import {
  FormControl,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UseFormRegister, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  label?: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  rules?: RegisterOptions<T, Path<T>>;
  showPassword?: boolean;
  onTogglePasswordVisibility?: () => void;
}

const CustomInput = <T extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  name,
  error,
  rules,
  showPassword,
  onTogglePasswordVisibility,
}: CustomInputProps<T>) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
      <label htmlFor={String(name)}>{label}</label>
      <FilledInput
        id={String(name)}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        {...register(name, rules)} 
        endAdornment={
          showPassword !== undefined && (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={onTogglePasswordVisibility}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </FormControl>
  );
};

export default CustomInput;
