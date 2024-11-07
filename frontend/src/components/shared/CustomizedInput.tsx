import React from "react";
import TextField from "@mui/material/TextField";
<<<<<<< HEAD
=======

>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
type Props = {
  name: string;
  type: string;
  label: string;
};
<<<<<<< HEAD
=======

>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
<<<<<<< HEAD
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
=======
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
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
      }}
    />
  );
};

export default CustomizedInput;
