import React from "react";
import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
      sx={{
        "& .MuiInputLabel-root": { color: "white" }, // Styles the label
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: 5,
          },
          "& input": {
            color: "white",
            fontSize: 20,
          },
        },
        width: "400px",
      }}
    />
  );
};

export default CustomizedInput;
