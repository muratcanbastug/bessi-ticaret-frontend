import UpdateCustomerLayout from "../../layouts/UpdateCustomerLayout";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";

export default function UpdateCustomer() {
  return (
    <Grid>
      <Header />
      <UpdateCustomerLayout />

      <Footer />
    </Grid>
  );
}
