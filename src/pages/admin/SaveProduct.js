import SaveProductLayout from "../../layouts/SaveProductLayout";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";

export default function SaveProduct() {
  return (
    <Grid>
      <Header />
      <SaveProductLayout />

      <Footer />
    </Grid>
  );
}
