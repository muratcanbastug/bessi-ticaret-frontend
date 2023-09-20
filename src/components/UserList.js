import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import SearchAppBar from "./Search";
import { PlusCircleFilled } from "@ant-design/icons";
import { removeUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "İsim",
  },
  {
    id: "address",
    numeric: false,
    label: "Adres",
  },
  {
    id: "phone_number",
    numeric: false,
    label: "Telefon Numarası",
  },
  {
    id: "buttons",
    numeric: false,
    label: "",
  },
];

function TableToolBar(props) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <SearchAppBar
        setSearchText={props.setSearchText}
        bckgrndClr="lightgray"
      />
      <Typography
        sx={{
          flex: "1 1 100%",
          position: "absolute",
          ml: 35,
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {props.title}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        href="/musteri-ekle"
        sx={{ marginLeft: 40 }}
        endIcon={<PlusCircleFilled />}
      >
        Yeni Müşteri Ekle
      </Button>
    </Toolbar>
  );
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function UserList(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRemoveClick = async (event, id) => {
    const responseStatus = await removeUser(id);
    if (responseStatus === 200) {
      window.location.reload();
    }
  };

  let navigate = useNavigate();

  const handleUpdateClick = async (event, id) => {
    navigate({ pathname: `/musteri-guncelle/${id}` });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(props.rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [props.rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 5, mt: 5, padding: 3 }}>
        <TableToolBar title={props.title} setSearchText={props.setSearchText} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="UserList"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.name}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.phoneNumber}</TableCell>

                    <TableCell align="left">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={(event) => handleRemoveClick(event, row.id)}
                      >
                        Sil
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={(event) => handleUpdateClick(event, row.id)}
                        sx={{ marginLeft: 4 }}
                      >
                        Güncelle
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 55 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
