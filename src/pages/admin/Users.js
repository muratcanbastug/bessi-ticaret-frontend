import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UserList from "../../components/UserList";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/UserService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllUsers(searchText).then((data) => {
      const newUsers = [];
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          newUsers.push({
            id: data[i].id,
            name: data[i].name,
            address: data[i].address,
            phoneNumber: data[i].phone,
          });
        }
      }
      setUsers(newUsers);
    });
  }, [searchText]);

  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          direction: "column",
          backgroundColor: "lightgray",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <UserList
            rows={users}
            title="Müşteriler"
            setSearchText={setSearchText}
          />
        </Box>
      </Grid>
      <Footer />
    </>
  );
}
