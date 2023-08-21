import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../images/BITlogo.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Sidebar from "../sidebar/sidebar";
import AccountContext from "../../context/accountContext";

export default function ButtonAppBar() {
  const account = React.useContext(AccountContext);
  const [sidebar, setSidebar] = React.useState(false);
  const [network, setNetwork] = React.useState("polygonMainnet");
  const handleChange = (e) => {
    setNetwork(e.target.value);
    account.setNetworkRPC(e.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ paddingTop: "20px" }}>
        <Toolbar
          style={{
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
          <Sidebar state={sidebar} setState={setSidebar} />
          <FormControl fullWidth={false}>
            <InputLabel id="demo-simple-select-label">Network</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={network}
              label="Network"
              onChange={handleChange}
            >
              <MenuItem value={"polygonMainnet"}>Polygon Mainnet</MenuItem>
              <MenuItem value={"polygonTestnet"}>Polygon Testnet</MenuItem>
            </Select>
          </FormControl>
          <Button
            color="inherit"
            onClick={() => {
              window.open("https://beimagine.tech");
            }}
          >
            <img src={logo} alt="Home" height="50px" />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
