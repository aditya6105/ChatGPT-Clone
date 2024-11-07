import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
<<<<<<< HEAD
        <img
          src="airobot.png"
          alt="Robot"
          style={{ width: "400px", marginLeft: "200px" }}
        />
=======
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
<<<<<<< HEAD
        mr={"auto"}
        // mt={16}
=======
        mt={16}
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
<<<<<<< HEAD
                background: `linear-gradient(to top, #51538f 0%, #00fffc 100%)`, // Set a linear gradient
                backgroundSize: "200% 200%", // Double the background size to allow smooth shifting
                backgroundPosition: "left bottom", // Initial position for the gradient
                transition:
                  "background-position 0.5s ease, color 0.3s, text-shadow 0.3s", // Transition for position change
                color: "white",
                ":hover": {
                  backgroundPosition: "right top", // New position for hover to create the shift
                  color: "white",
                  textShadow: "0 0 8px white, 0 0 12px white, 0 0 16px white", // Glowing effect
=======
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
