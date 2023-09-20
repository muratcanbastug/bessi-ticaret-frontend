import UpdateProductLayout from "../../layouts/UpdateProductLayout";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";

export default function UpdateProduct() {
  return (
    <Grid>
      <Header />
      <UpdateProductLayout />

      <Footer />
    </Grid>
  );
}
