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
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
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
