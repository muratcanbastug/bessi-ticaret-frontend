import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Input, Select, MenuItem } from "@mui/material";

const ProductCard = ({ id, imageUrl, name, unit, setInfo, setInfoMessage }) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(unit[0]);

  const handleAddToBasket = () => {
    const order = {
      id: id,
      name: name,
      quantity: quantity,
      unit: selectedUnit,
    };

    const cookies = document.cookie.split("; ");
    const basketCookie = cookies.find(function (cookie) {
      return cookie.startsWith("basket=");
    });

    let basketJSON = basketCookie ? basketCookie.split("=")[1] : null;
    if (basketJSON !== null) {
      const basket = JSON.parse(basketJSON);
      basket.push(order);
      basketJSON = JSON.stringify(basket);
      document.cookie = "basket=" + basketJSON + "; path=/";
      setInfo(true);
      setInfoMessage("Ürün sepete eklenmiştir.");
    } else {
      console.log("Given cookie could not find.");
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    } else {
      setQuantity(0);
    }
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  return (
    <Card
      sx={{
        width: 220,
        height: 335,
        backgroundColor: "red",
        borderRadius: 4,
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        sx={{
          height: 205,
          borderRadius: 4,
          border: "4px solid red",
          backgroundColor: "darkgray",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.06)",
          },
        }}
        image={imageUrl}
        title={name}
      />
      <CardContent
        sx={{
          paddingTop: "1px",
          paddingBottom: "1px",
        }}
      >
        <Typography
          sx={{
            color: "white",
          }}
          variant="h6"
        >
          {name}
        </Typography>
        <Grid
          container
          spacing={4}
          sx={{
            direction: "column",
            backgroundColor: "white",
            ml: -2,
            mt: 0,
            width: "220px",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ width: "50px" }}
          >
            <Button onClick={handleDecrease}>
              <Typography variant="h6">-</Typography>
            </Button>
          </Grid>

          <Input
            item
            id="quantity-input"
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            sx={{
              width: "30px",
              textAlign: "center",
            }}
          />
          <Select
            item
            value={selectedUnit}
            onChange={handleUnitChange}
            sx={{ width: "90px" }}
          >
            {unit.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ width: "50px" }}
          >
            <Button onClick={handleIncrease}>
              <Typography variant="h6">+</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid
          sx={{
            ml: -2,
            width: "220px",
            color: "blue",
            backgroundColor: "white",
            borderRadius: "0",
          }}
        >
          <Button onClick={handleAddToBasket}>
            <Typography>Sepete Ekle</Typography>
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
