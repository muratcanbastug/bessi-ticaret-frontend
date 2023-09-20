import Categories from "../components/Categories";
import Search from "../components/Search";
import Grid from "@mui/material/Grid";
const CategoryAndSearch = ({ setSearchText, setType }) => {
  return (
    <Grid
      container
      sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      position="static"
    >
      <Categories setType={setType} />
      <Search setSearchText={setSearchText} mrgnTop={5} bckgrndClr="gold" />
    </Grid>
  );
};
export default CategoryAndSearch;
