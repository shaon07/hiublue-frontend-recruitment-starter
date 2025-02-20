"use client";

import { useListUsersApi } from "@/services/useListUsersApi";
import { Edit, MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";

export default function OfferList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const { users, meta, loading } = useListUsersApi({
    page: paginationModel.page + 1,
    perPage: paginationModel.pageSize,
  });

  const filteredOffers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
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
        User List
      </Typography>

      <Box display="flex" gap={2} my={2} alignItems="center">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        rows={filteredOffers}
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
