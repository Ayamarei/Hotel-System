import { Box, Button, Typography } from '@mui/material';
interface CapacityProps {
  value: number;
  onChange: (value: number) => void;
}

export default function Capacity({ value, onChange }: CapacityProps) {

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F6F7FB",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Button
          onClick={handleDecrement}
          sx={{
            minWidth: "50px",
            height: "50px",
            backgroundColor: "#EB5757",
            color: "white",
            fontSize: "24px",
            "&:hover": { backgroundColor: "#c64545" },
            borderRadius: 0,
          }}
        >
          -
        </Button>

        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "500",
            color: "rgba(21, 44, 91, 1)",
          }}
        >
          {value} person
        </Typography>

        <Button
          onClick={handleIncrement}
          sx={{
            minWidth: "50px",
            height: "50px",
            backgroundColor: "#27AE60",
            color: "white",
            fontSize: "24px",
            "&:hover": { backgroundColor: "#1e874b" },
            borderRadius: 0,
          }}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}