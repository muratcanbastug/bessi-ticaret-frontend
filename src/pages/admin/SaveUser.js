import SaveCustomerLayout from "../../layouts/SaveCustomerLayout";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";

export default function SaveCustomer() {
  return (
    <Grid>
      <Header />
      <SaveCustomerLayout />

      <Footer />
    </Grid>
  );
}
