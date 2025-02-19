"use client";

import { Edit, MoreVert } from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useState } from "react";

const initialOffers = [
  {
    id: 1,
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    type: "Monthly",
    status: "Accepted",
  },
  {
    id: 2,
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    type: "Yearly",
    status: "Rejected",
  },
  {
    id: 3,
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    type: "Monthly",
    status: "Pending",
  },
  {
    id: 4,
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    type: "Pay As You Go",
    status: "Accepted",
  },
  {
    id: 5,
    name: "Jayvion Simon",
    email: "nannie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueilwitz and Sons",
    jobTitle: "CEO",
    type: "Monthly",
    status: "Accepted",
  },
  {
    id: 6,
    name: "Alison Parker",
    email: "alison.parker@gmail.com",
    phone: "123-456-7890",
    company: "Parker & Co.",
    jobTitle: "CTO",
    type: "Yearly",
    status: "Rejected",
  },
  {
    id: 7,
    name: "Michael Doe",
    email: "michael.doe@outlook.com",
    phone: "987-654-3210",
    company: "Doe Industries",
    jobTitle: "Manager",
    type: "Monthly",
    status: "Pending",
  },
  {
    id: 8,
    name: "Sophia Johnson",
    email: "sophia.johnson@yahoo.com",
    phone: "654-321-0987",
    company: "Tech Solutions",
    jobTitle: "HR Lead",
    type: "Pay As You Go",
    status: "Accepted",
  },
  {
    id: 9,
    name: "David Brown",
    email: "david.brown@company.com",
    phone: "111-222-3333",
    company: "Brown Enterprises",
    jobTitle: "Founder",
    type: "Monthly",
    status: "Accepted",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Accepted":
      return "success";
    case "Rejected":
      return "error";
    case "Pending":
      return "warning";
    default:
      return "default";
  }
};

export default function OfferList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const filteredOffers = initialOffers.filter((offer) => {
    const matchesSearch =
      offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || offer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone number", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "jobTitle", headerName: "Job Title", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip label={params.value} color={getStatusColor(params.value)} />
      ),
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
        pageSizeOptions={[5, 10, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  );
}
