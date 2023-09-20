import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { saveUser } from "../services/UserService";

const SaveCustomerLayout = () => {
  let navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let newUserInfo = {
      userName: userName,
      name: customerName,
      phoneNumber: phoneNumber,
      address: address,
      password: password,
    };

    let responseStatus = await saveUser(newUserInfo, setErrorMessage, setError);
    if (responseStatus === 200) {
      navigate({ pathname: `/musteriler` });
    } else {
      setErrorMessage(
        "Kullanıcı bilgilerini kaydederken bir hata oldu. Lütfen tekrar deneyiniz."
      );
      setError(true);
    }

    setIsLoading(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ mt: 4, mb: 6 }}
      >
        Yeni Müşteri Ekle
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              label="Müşteri Adı"
              fullWidth
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
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
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              label="Telefon Numarası"
              fullWidth
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              label="Adres"
              fullWidth
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Kullanıcı Adı (Sisteme Giriş Yaparken)"
              fullWidth
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Şifre (Sisteme Giriş Yaparken)"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        >
          <Button type="submit" variant="contained" color="primary">
            Kaydet
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
        </Grid>
      </form>
    </Container>
  );
};

export default SaveCustomerLayout;
