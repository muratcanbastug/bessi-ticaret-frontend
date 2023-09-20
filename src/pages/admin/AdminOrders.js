import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AdminOrderCard from "../../components/AdminOrderCard";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrders, confirmAllOrders } from "../../services/OrderService";
import { green } from "@mui/material/colors";

var XLSX = require("xlsx");

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllOrders().then((orders) => {
      const allOrders = [];
      if (orders !== null) {
        for (let i = 0; i < orders.length; i++) {
          const customerOrders = [];
          for (let j = 0; j < orders[i].orderItemDTOList.length; j++) {
            customerOrders.push({
              productId: orders[i].orderItemDTOList[j].productId,
              orderId: orders[i].orderItemDTOList[j].orderId,
              name: orders[i].orderItemDTOList[j].productName,
              quantity: orders[i].orderItemDTOList[j].amount,
              unit: orders[i].orderItemDTOList[j].unit,
            });
          }
          if (customerOrders.length > 0) {
            let note = orders[i].orderItemDTOList[0].note;
            if (note === "") {
              note = "Müşteri bir not göndermedi.";
            }
            allOrders.push({
              customer: orders[i].user.username,
              products: customerOrders,
              note: note,
            });
          } else {
            allOrders.push({
              customer: orders[i].user.username,
              products: customerOrders,
              note: "Müşteri henüz sipariş oluşturmadı.",
            });
          }
        }
      }
      setOrders(allOrders);
      console.log(allOrders);
    });
  }, []);

  const handleConfirmAllOrders = async () => {
    setIsLoading(true);
    var now = new Date();

    // History
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var hour = now.getHours();
    var minute = now.getMinutes();

    // Create exel files
    const data = [];
    const header = ["Cinsi", "Toplam"];

    const customerNames = Array.from(
      new Set(orders.map((order) => order.customer))
    );
    header.push(...customerNames);
    data.push(header);

    const products = {};

    orders.forEach((order) => {
      order.products.forEach((product) => {
        const key = `${product.name} - ${product.unit}`;
        if (!products[key]) {
          products[key] = {
            [order.customer]: product.quantity,
            Cinsi: product.name + " - " + product.unit,
          };
        } else {
          products[key][order.customer] =
            (products[key][order.customer] || 0) + product.quantity;
        }
      });
    });

    Object.values(products).forEach((productData) => {
      const row = [];
      row.push(productData["Cinsi"]);
      let sum = 0;
      customerNames.forEach((customerName) => {
        sum += productData[customerName] || 0;
      });

      row.push(sum);

      customerNames.forEach((customerName) => {
        row.push(productData[customerName] || 0);
      });

      data.push(row);
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Siparişler");

    XLSX.writeFile(
      wb,
      hour +
        "." +
        minute +
        "_" +
        day +
        "." +
        month +
        "." +
        year +
        "_Çizelgeler.xlsx"
    );

    // Delete all orders
    const responseStatus = await confirmAllOrders();
    if (responseStatus !== 200) {
      setErrorMessage(
        "Siparişler onaylanırken bir hata oluştu. Lütfen tekrar deneyiniz."
      );
      setError(true);
    }

    setIsLoading(false);
    window.location.reload();
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mt: 4, mb: 6 }}
        >
          Siparişler
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {orders.map((order, index) => (
              <AdminOrderCard
                key={index}
                customer={order.customer}
                products={order.products}
                note={order.note}
              />
            ))}
          </Grid>
        </Grid>
        <Box sx={{ position: "relative" }}>
          <Button
            onClick={() => handleConfirmAllOrders()}
            variant="contained"
            disabled={isLoading}
            sx={{
              mb: 5,
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "14px 20px",
              fontSize: "16px",
            }}
          >
            Siparişleri Onayla ve Çizelgeleri İndir
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={error}
          onClose={() => setError(false)}
          key="errorMessage"
        >
          <Alert
            onClose={() => setError(false)}
            variant="filled"
            severity="error"
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </>
  );
}
