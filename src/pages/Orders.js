import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import OrderCard from "../components/OrderCard";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { useState, useEffect } from "react";
import { green } from "@mui/material/colors";
import { saveOrder } from "../services/OrderService";

export default function Orders() {
  let navigate = useNavigate();

  const [note, setNote] = useState("");
  const [basket, setBasket] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = document.cookie.split("; ");
      const basketCookie = cookies.find(function (cookie) {
        return cookie.startsWith("basket=");
      });

      let basketJSON = basketCookie ? basketCookie.split("=")[1] : null;
      if (basketJSON !== null) {
        const basketList = JSON.parse(basketJSON);
        setBasket(basketList);
      } else {
        console.log("Given cookie could not find.");
      }
    };
    fetchData();
  }, []);

  const handleConfirmOrders = async () => {
    setIsLoading(true);
    let orders = [];
    for (let i = 0; i < basket.length; i++) {
      orders.push({
        productId: basket[i].id,
        amount: basket[i].quantity,
        note: note,
        unit: basket[i].unit,
      });
    }

    const orderItem = {
      orderItemDTOList: orders,
    };

    const responseStatus = await saveOrder(
      orderItem,
      setErrorMessage,
      setError
    );
    if (responseStatus === 200) {
      const cookies = document.cookie.split("; ");
      const basketCookie = cookies.find(function (cookie) {
        return cookie.startsWith("basket=");
      });

      let basketJSON = basketCookie ? basketCookie.split("=")[1] : null;
      if (basketJSON !== null) {
        basketJSON = JSON.stringify([]);
        document.cookie = "basket=" + basketJSON + "; path=/";
        setBasket([]);
        setNote("");
        navigate({ pathname: `/ana-sayfa` });
      } else {
        console.log("Given cookie could not find.");
      }
    }

    setIsLoading(false);
  };

  const handleDeleteOrder = (id, quantity, unit) => {
    const cookies = document.cookie.split("; ");
    const basketCookie = cookies.find(function (cookie) {
      return cookie.startsWith("basket=");
    });

    let basketJSON = basketCookie ? basketCookie.split("=")[1] : null;
    if (basketJSON !== null) {
      let basketList = JSON.parse(basketJSON);
      basketList = basketList.filter(
        (item) =>
          item.id !== id || item.quantity !== quantity || item.unit !== unit
      );

      setBasket(basketList);
      basketJSON = JSON.stringify(basketList);
      document.cookie = "basket=" + basketJSON + "; path=/";
    } else {
      console.log("Given cookie could not find.");
    }
  };

  const handleTextChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 4, mb: 6 }}
        >
          Siparişler
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {basket.map((order, index) => (
              <OrderCard
                key={index}
                id={order.id}
                name={order.name}
                unit={order.unit}
                quantity={order.quantity}
                handleDeleteOrder={handleDeleteOrder}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Sipariş Mesajı"
              fullWidth
              multiline
              value={note}
              onChange={handleTextChange}
              rows={4.5}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: "2px",
                  },
                  "& .MuiInputBase-input": {
                    fontWeight: "bold",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ position: "relative" }}>
          <Button
            variant="contained"
            sx={{
              mb: 5,
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "14px 20px",
              fontSize: "16px",
            }}
            onClick={handleConfirmOrders}
          >
            Siparişleri Onayla
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
      </Container>
      <Footer />
    </>
  );
}
