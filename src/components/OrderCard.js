import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, Typography } from "@mui/material";

const OrderCard = ({ id, name, quantity, unit, handleDeleteOrder }) => {
  const handleDelete = () => {
    handleDeleteOrder(id, quantity, unit);
  };
  return (
    <Grid
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
            {name}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              mr: "25px",
              fontSize: "20px",
            }}
          >
            {quantity + " " + unit}
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
        onClick={handleDelete}
      >
        <DeleteIcon />
      </Button>
    </Grid>
  );
};

export default OrderCard;
