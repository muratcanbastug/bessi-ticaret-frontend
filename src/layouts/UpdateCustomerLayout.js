import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  updateUser,
  updateUserPassword,
} from "../services/UserService";

const UpdateCustomerLayout = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const id = pathname.split("/")[2];

  const [customerName, setCustomerName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getUser(id);
      setCustomerName(response.name);
      setUserName(response.userName);
      setPhoneNumber(response.phone);
      setAddress(response.address);
    }
    fetchData();
  }, [id]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    let updatePasswordStatus = null;

    if (password !== "") {
      updatePasswordStatus = await updateUserPassword(
        password,
        id,
        setErrorMessage,
        setError
      );
    }

    let newUserInfo = {
      userName: userName,
      name: customerName,
      phoneNumber: phoneNumber,
      address: address,
    };
    let responseStatus = await updateUser(
      newUserInfo,
      id,
      setErrorMessage,
      setError
    );

    if (
      (responseStatus === 200 && updatePasswordStatus === 200) ||
      (responseStatus === 200 && updatePasswordStatus === null)
    ) {
      navigate({ pathname: `/musteriler` });
    } else {
      setErrorMessage(
        "Kullanıcı bilgilerini güncellerken bir hata oldu. Lütfen tekrar deneyiniz."
      );
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ mt: 4, mb: 6 }}
      >
        "{customerName.toUpperCase()}" Kullanıcı Bilgisi Güncelle
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
            Bilgileri Kaydet
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

export default UpdateCustomerLayout;
