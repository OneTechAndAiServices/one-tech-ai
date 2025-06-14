

'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Menu, MenuItem,
  IconButton, Chip, CircularProgress, Alert, Snackbar
} from '@mui/material';
import { Add, Edit, Delete, MoreVert, CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    isActive: true
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        router.push('/admin/login');
      }
      showSnackbar('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setCurrentUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentUser(null);
  };

  const handleOpenDialog = (user = null) => {
    setCurrentUser(user);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        isActive: user.isActive
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user',
        isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (currentUser) {
        // Update existing user
        await axios.put(`/api/users/${currentUser._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showSnackbar('User updated successfully', 'success');
      } else {
        // Create new user
        await axios.post('/api/users', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        showSnackbar('User created successfully', 'success');
      }
      fetchUsers();
      handleCloseDialog();
    } catch (error) {
      showSnackbar(error.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/users/${currentUser._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSnackbar('User deleted successfully', 'success');
      fetchUsers();
      handleMenuClose();
    } catch (error) {
      showSnackbar('Failed to delete user', 'error');
    }
  };

  const toggleUserStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/users/${currentUser._id}`, {
        isActive: !currentUser.isActive
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSnackbar(`User ${currentUser.isActive ? 'deactivated' : 'activated'}`, 'success');
      fetchUsers();
      handleMenuClose();
    } catch (error) {
      showSnackbar('Failed to update user status', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? 'Active' : 'Inactive'}
                      color={user.isActive ? 'success' : 'error'}
                      icon={user.isActive ? <CheckCircle /> : <Cancel />}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuClick(e, user)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{currentUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={!!currentUser}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required={!currentUser}
              helperText={currentUser ? "Leave blank to keep current password" : ""}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                SelectProps={{ native: true }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </TextField>
              <TextField
                select
                fullWidth
                label="Status"
                name="isActive"
                value={formData.isActive}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  isActive: e.target.value === 'true'
                }))}
                SelectProps={{ native: true }}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {currentUser ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* <MenuItem onClick={() => { handleOpenDialog(currentUser); handleMenuClose(); }}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem> */}
        <MenuItem onClick={toggleUserStatus}>
          {currentUser?.isActive ? (
            <>
              <Cancel fontSize="small" sx={{ mr: 1 }} /> Deactivate
            </>
          ) : (
            <>
              <CheckCircle fontSize="small" sx={{ mr: 1 }} /> Activate
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}