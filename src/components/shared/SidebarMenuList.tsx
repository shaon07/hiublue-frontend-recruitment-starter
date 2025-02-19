import { Dashboard } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export default function SidebarMenuList() {
  return (
    <List>
      <ListItemButton>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ListItemIcon />
        </ListItemIcon>
        <ListItemText primary="Onboarding" />
      </ListItemButton>
    </List>
  );
}
