import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { getUserRole } from "../../services/UserService";
import { useAuth } from "../../providers/AuthProvider";
import { loginService } from "../../services/AuthService";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password").length < 4) {
      setErrorMessage("Lütfen geçerli bir şifre giriniz.");
      setError(true);
      return;
    }
    setIsLoading(true);
    const formData = new URLSearchParams();
    formData.append("username", data.get("username"));
    formData.append("password", data.get("password"));
    let loginResponse = await loginService(formData, setError, setErrorMessage);
    if (loginResponse === 200) {
      let response = await getUserRole(setError, setErrorMessage);
      login(response.data);
    }
    setIsLoading(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          position: "relative",
          display: "flex",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: "flex",
            backgroundImage: "url(assets/images/auth_background.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: "rgba(139, 0, 139, 0.2)",
          }}
        >
          <Box
            sx={{
              my: 16,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Giriş Yap
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Kullanıcı Adı"
                name="username"
                type="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Şifre"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                >
                  Giriş Yap
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
              <Grid container>
                <Grid item>
                  Sipariş vermek ve üyelik almak için ulaşınız: 0553 293 4344
                </Grid>
              </Grid>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={error}
                onClose={() => setError(false)}
                key="errorMessage"
              >
                <Alert
                  onClose={() => setError(false)}
                  variant="filled"
                  severity="error"
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
