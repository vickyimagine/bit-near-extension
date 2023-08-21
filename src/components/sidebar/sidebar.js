import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import NoteIcon from "@mui/icons-material/Note";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import LockIcon from "@mui/icons-material/Lock";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { expandView } from "../scripts/accounts";

import { useContext } from "react";
import AccountContext from "../../context/accountContext";

export default function Sidebar(props) {
  const { state, setState } = props;
  const account = useContext(AccountContext);

  const MyList = () => {
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setState(false)}
        onKeyDown={() => setState(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Recent Transactions"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => expandView()}>
            <ListItemButton>
              <ListItemIcon>
                <OpenInFullIcon />
              </ListItemIcon>
              <ListItemText primary={"Expand"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => account.setView("aboutUs")}>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About Us"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => account.setView("terms")}>
            <ListItemButton>
              <ListItemIcon>
                <NoteIcon />
              </ListItemIcon>
              <ListItemText primary={"Terms & Conditions"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => account.setView("privacy")}>
            <ListItemButton>
              <ListItemIcon>
                <PrivacyTipIcon />
              </ListItemIcon>
              <ListItemText primary={"Privacy Policy"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    );
  };

  return (
    <div>
      <Drawer anchor="left" open={state} onClose={() => setState(false)}>
        <MyList />
      </Drawer>
    </div>
  );
}
