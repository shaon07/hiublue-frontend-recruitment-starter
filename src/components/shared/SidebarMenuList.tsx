import { List, ListItemButton, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import { DashBoardIcon, OnBoardIcon } from "../iconify/iconify";

type SidebarMenuListProps = {
  onSelect?: (data?: string) => void;
};
export default function SidebarMenuList({
  onSelect = () => {},
}: SidebarMenuListProps) {
  const router = useRouter();
  return (
    <List>
      <ListItemButton
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
        onClick={() => {
          router.push("/");
          onSelect("dashboard");
        }}
      >
        <DashBoardIcon />
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
        onClick={() => {
          router.push("/onboarding");
          onSelect("onboarding");
        }}
      >
        <OnBoardIcon />
        <ListItemText primary="Onboarding" />
      </ListItemButton>
    </List>
  );
}
