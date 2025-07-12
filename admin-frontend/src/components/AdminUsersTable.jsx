import React, { useState } from 'react';
import { Box, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Alert, Typography } from '@mui/material';
import useApiResource from './useApiResource';
import UserDetailDialog from './UserDetailDialog';
import { approveUser, rejectUser } from '../services/apiService';
import { SellerDetailDialog, BuyerDetailDialog } from './user';
import { useAuth } from '../context/AuthContext.jsx';

const USER_ROLES = [
  { label: 'Admins', value: 'ADMIN' },
  { label: 'Sellers', value: 'SELLER' },
  { label: 'Buyers', value: 'BUYER' }
];

export default function AdminUsersTable() {
  const [tab, setTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const {
    data: users,
    error,
    loading,
    refetch
  } = useApiResource('/users');
  const { token } = useAuth();

  const handleApprove = async (userId) => {
    setActionLoading(true);
    try {
      await approveUser(userId, token);
      refetch();
    } finally {
      setActionLoading(false);
    }
  };
  const handleReject = async (userId) => {
    setActionLoading(true);
    try {
      await rejectUser(userId, token);
      refetch();
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users?.filter(u => u.role === USER_ROLES[tab].value) || [];

  return (
    <Box mt={4} sx={{ width: '100%', background: 'transparent' }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        {USER_ROLES.map((role, idx) => (
          <Tab key={role.value} label={role.label} />
        ))}
      </Tabs>
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer sx={{ mt: 2, width: '100%', background: 'transparent', boxShadow: 'none' }}>
          <Table sx={{ minWidth: 1100, width: '100%', background: 'transparent' }}>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography color="text.secondary">No users found. This feature/page is coming soon!</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Button variant="text" onClick={() => { setSelectedUser(user); setDialogOpen(true); }} sx={{ textTransform: 'none', p: 0, minWidth: 0 }}>
                        {user.name}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="text" onClick={() => { setSelectedUser(user); setDialogOpen(true); }} sx={{ textTransform: 'none', p: 0, minWidth: 0 }}>
                        {user.email}
                      </Button>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      {user.status !== 'APPROVED' && (
                        <Button size="small" color="success" onClick={() => handleApprove(user.id)}>Approve</Button>
                      )}
                      {user.status !== 'REJECTED' && (
                        <Button size="small" color="error" onClick={() => handleReject(user.id)}>Reject</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <UserDetailDialog
        open={dialogOpen && selectedUser && selectedUser.role === 'ADMIN'}
        onClose={() => setDialogOpen(false)}
        user={selectedUser}
        loading={actionLoading}
      />
      <SellerDetailDialog
        open={dialogOpen && selectedUser && selectedUser.role === 'SELLER'}
        onClose={() => setDialogOpen(false)}
        seller={selectedUser}
        onApprove={handleApprove}
        onReject={handleReject}
        loading={actionLoading}
      />
      <BuyerDetailDialog
        open={dialogOpen && selectedUser && selectedUser.role === 'BUYER'}
        onClose={() => setDialogOpen(false)}
        buyer={selectedUser}
        onApprove={handleApprove}
        onReject={handleReject}
        loading={actionLoading}
      />
    </Box>
  );
}
