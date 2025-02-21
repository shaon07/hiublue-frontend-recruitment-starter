"use client";

import useUserListApi from "@/services/useUserListApi";
import { Edit, MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

export default function OfferList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [tabs, setTabs] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue);
  };

  const { users, meta, loading } = useUserListApi({
    page: paginationModel.page + 1,
    per_page: paginationModel.pageSize,
    search: searchTerm,
    status: statusFilter !== "All" ? statusFilter : undefined,
  });

  const handleSearchChange = debounce((value: string) => {
    setSearchTerm(value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, 300);

  useEffect(() => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, [statusFilter]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography fontWeight={600}>{params.value}</Typography>
          <Typography variant="body2" color="text.secondary">
            {params.row.email}
          </Typography>
        </Box>
      ),
    },
    { field: "phone", headerName: "Phone number", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "jobTitle", headerName: "Job Title", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        let variant = "primary";
        switch (params.value) {
          case "accepted":
            variant = "success";
            break;
          case "rejected":
            variant = "error";
            break;
          case "pending":
            variant = "success";
            break;
          default:
            variant = "primary";
        }
        return (
          <Box>
            <Chip label={params.value} color={variant as any} size="small" />
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: () => (
        <>
          <IconButton size="small">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <MoreVert fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Card sx={{ p: 3, width: "100%", overflowX: "auto" }}>
      <Typography variant="h6" fontWeight={600}>
        Offer List
      </Typography>

      <Tabs
        value={tabs}
        onChange={(e, value) => {
          handleTabChange(e, value);
          setStatusFilter(value === 0 ? "All" : "Accepted");
        }}
        textColor="inherit"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "black",
          },
        }}
      >
        <Tab label="All" />
        <Tab label="Accepted" />
      </Tabs>

      <Box display="flex" gap={2} my={2} alignItems="center">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{ width: "30%" }}
        />
        <TextField
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{ width: "20%" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </TextField>
      </Box>

      <DataGrid
        rows={users.map((user) => ({
          id: user.id,
          name: user.user_name,
          email: user.email,
          phone: user.phone,
          company: user.company,
          jobTitle: user.jobTitle,
          type: user.type,
          status: user.status,
        }))}
        columns={columns}
        rowCount={meta?.total}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        autoHeight
      />
    </Card>
  );
}
