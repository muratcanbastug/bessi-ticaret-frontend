import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Typography,
  Grid,
  Input,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import OutlinedInput from "@mui/material/OutlinedInput";
import { saveProduct } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import { postImage } from "../services/ImgService";

const SaveProductLayer = () => {
  let navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [unit, setUnit] = useState([]);
  const [type, setType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let newProductInfo = {
      name: productName,
      units: unit,
      type: type,
    };

    let responseFileStatus = await postImage(selectedFile, productName);
    if (responseFileStatus === 200) {
      let response = await saveProduct(
        newProductInfo,
        setErrorMessage,
        setError
      );
      if (response.status === 200) {
        navigate({ pathname: `/urunler` });
      }
    } else {
      setErrorMessage(
        "Ürün resmini yüklerken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz."
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
        Yeni Ürün Ekle
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} md={3} sx={{ direction: "column" }}>
            <TextField
              label="Ürün Adı"
              fullWidth
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
          <Grid item xs={12} sm={3} md={3} sx={{ direction: "column" }}>
            <FormControl fullWidth required>
              <InputLabel>Birim</InputLabel>
              <Select
                label="Birim"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                multiple
              >
                <MenuItem value="kg">Kg</MenuItem>
                <MenuItem value="tane">Tane</MenuItem>
                <MenuItem value="paket">Paket</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3} sx={{ direction: "column" }}>
            <FormControl fullWidth required>
              <InputLabel>Tür</InputLabel>
              <Select
                label="Tür"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <MenuItem value="FRUIT">Meyve</MenuItem>
                <MenuItem value="VEGATABLE">Sebze</MenuItem>
                <MenuItem value="PACKAGE PRODUCT">Paket Ürün</MenuItem>
                <MenuItem value="GREENS">Yeşillik</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={12}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        >
          <Button type="submit" variant="contained" color="primary">
            Onayla
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

export default SaveProductLayer;
