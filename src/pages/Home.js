import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Grid from "@mui/material/Grid";

import Products from "../layouts/Products";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/ProductService";

export default function Home() {
  const [cards, setCards] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getAllProducts(searchText, type).then((data) => {
      const newCards = [];
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          let productName = data[i].name;
          newCards.push({
            imageUrl: `http://localhost:8080/bessisebzemeyve/files/stat-${productName}.png`,
            name: productName,
            id: data[i].id,
            unit: data[i].units,
          });
        }
      }
      setCards(newCards);
    });
  }, [searchText, type]);

  return (
    <Grid>
      <Header />
      <Products cards={cards} setSearchText={setSearchText} setType={setType} />
      <Footer />
    </Grid>
  );
}
