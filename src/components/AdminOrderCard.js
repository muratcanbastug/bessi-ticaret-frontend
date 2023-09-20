import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { removeOrder } from "../services/OrderService";

export default function AdminOrderCard({ customer, products, note }) {
  const handleDeleteOrder = async (id) => {
    const responseStatus = await removeOrder(id);
    if (responseStatus === 200) {
      window.location.reload();
    }
  };
  return (
    <>
      <Container
        maxWidth="md"
        sx={{ mt: 4, mb: 4, backgroundColor: "lightgray", borderRadius: 5 }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ pt: 3, mb: 3 }}
        >
          {customer}
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {products.map((product, index) => (
              <Grid
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: "30px",
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      fontWeight: "bold",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        ml: "25px",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        mr: "25px",
                        fontSize: "20px",
                      }}
                    >
                      {product.quantity + " " + product.unit}
                    </Typography>
                  </Grid>
                </Paper>
                <Button
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    width: "46px",
                    height: "46px",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    "&:hover": {
                      backgroundColor: "darkred",
                    },
                  }}
                  variant="contained"
                  aria-label="delete"
                  onClick={() => handleDeleteOrder(product.orderId)}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,
                backgroundColor: "#f0f0f0",
                border: "1px solid black",
                borderRadius: "8px",
                p: "5px",
              }}
            >
              <Typography variant="body1" gutterBottom>
                {note}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
