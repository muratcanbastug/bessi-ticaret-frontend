import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import React from "react";
import { Button, Grid, Paper } from "@mui/material";

export default function AdminPanel() {
  return (
    <>
      <Header />
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          width: "100%",
        }}
      >
        <Grid container spacing={0} sx={{ width: "400px" }}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ borderRadius: "0", height: "100px" }}
                href="/musteriler"
              >
                Müşteriler
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ borderRadius: "0", height: "100px" }}
                href="/urunler"
              >
                Ürünler
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Button
                variant="contained"
                color="info"
                fullWidth
                sx={{ borderRadius: "0", height: "100px" }}
                href="/siparisler"
              >
                Sipariş Çizelgeleri
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
