import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
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
          src="pngwing.com.png"
          alt="img"
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
=======
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
        // mt={16}
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
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
<<<<<<< HEAD
                borderRadius: 2,
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
                borderRadius: 50,
                bgcolor: "#00fffc",
                color: "black",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
>>>>>>> 1b2951236337411173891451c6ffa3adaf18c7bc
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
