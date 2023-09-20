import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "orange",
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Hakkımızda
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Meyve sebze siparişlerinizi en taze şekilde size ulaştırmaya
              çalışıyoruz.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              İletişime Geç
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Adres
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Telefon: 0553 293 4344
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Bizi Takip Et
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="http://localhost:3000/">
              Bessi Sebze Meyve
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
