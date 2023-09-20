import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Grid from "@mui/material/Grid";

import CategoryAndSearch from "./CategoryAndSearch";
import { Button, Snackbar } from "@mui/material";
import { Info } from "@mui/icons-material";

const Products = ({ cards, setSearchText, setType }) => {
  const basket = [];
  const basketJSON = JSON.stringify(basket);
  document.cookie = "basket=" + basketJSON + "; path=/";

  const [info, setInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  return (
    <>
      <CategoryAndSearch setSearchText={setSearchText} setType={setType} />
      <Grid
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          ml: 15,
          mr: 15,
          mt: 10,
          mb: 10,
        }}
      >
        {cards.map((card) => (
          <ProductCard
            key={card.id}
            id={card.id}
            imageUrl={card.imageUrl}
            name={card.name}
            unit={card.unit}
            setInfo={setInfo}
            setInfoMessage={setInfoMessage}
          />
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{
          mb: 5,
        }}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "16px 24px",
          fontSize: "18px",
        }}
        href="/sepet"
      >
        Sepete Git
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={info}
        onClose={() => setInfo(false)}
        key="infoMessage"
      >
        <Info onClose={() => setInfo(false)} variant="filled" severity="info">
          {infoMessage}
        </Info>
      </Snackbar>
    </>
  );
};

export default Products;
