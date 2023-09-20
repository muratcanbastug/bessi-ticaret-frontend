import ProductList from "../../components/ProductList";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAllProducts, removeProduct } from "../../services/ProductService";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllProducts(searchText, "ALL TYPES").then((data) => {
      const newProducts = [];
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          let productType = data[i].type;
          let type;
          if (productType === "VEGATABLE") {
            type = "Sebze";
          } else if (productType === "FRUIT") {
            type = "Meyve";
          } else if (productType === "PACKAGE PRODUCT") {
            type = "Paket Ürün";
          } else {
            type = "Yeşillik";
          }
          newProducts.push({
            name: data[i].name,
            units: data[i].units,
            type: type,
            id: data[i].id,
          });
        }
      }
      setProducts(newProducts);
    });
  }, [searchText]);

  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          direction: "column",
          backgroundColor: "lightgray",
        }}
      >
        <Box
          sx={{
            width: "60%",
          }}
        >
          <ProductList
            rows={products}
            setSearchText={setSearchText}
            title="Ürünler"
            removeMethod={removeProduct}
          />
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
