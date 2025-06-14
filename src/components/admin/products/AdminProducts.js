'use client';
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination, Chip, IconButton, Tooltip, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, FormControl, InputLabel,
  Select, useTheme, styled, Snackbar, Alert, Avatar, Badge, Divider, Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  AttachMoney as PriceIcon,
  Numbers as StockIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Custom styled components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { 
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  backgroundColor:
    status === 'Active'
      ? theme.palette.success.light
      : status === 'Draft'
      ? theme.palette.warning.light
      : theme.palette.error.light,
  color:
    status === 'Active'
      ? theme.palette.success.dark
      : status === 'Draft'
      ? theme.palette.warning.dark
      : theme.palette.error.dark,
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

export default function Products() {
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [addExistingDialogOpen, setAddExistingDialogOpen] = useState(false);
  const [selectedExistingProducts, setSelectedExistingProducts] = useState([]);

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Blank product template
  const blankProduct = { 
    name: '', 
    description: '', 
    price: 0, 
    cost: 0,
    stock: 0,
    sku: '',
    category: [],
    status: 'Active',
    image: '',
  };

  const [currentProduct, setCurrentProduct] = useState(blankProduct);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  // Sample categories for demo
  const categories = [
    'Electronics', 'Clothing', 'Home & Garden', 
    'Books', 'Toys', 'Sports', 'Beauty', 'Food', 'Healthcare', 'Accounting', 'Business', 'ERP', 'Others'
  ];

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      setRows(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Initialize data
  useEffect(() => {
    fetchProducts();
  }, []);

  // Apply filters and sorting
  const applyFilters = async () => {
    try {
      setLoading(true);
      let query = `page=${page + 1}&limit=${rowsPerPage}`;
      
      if (searchText) {
        query += `&q=${encodeURIComponent(searchText)}`;
      }
      
      if (filter !== 'all') {
        query += `&status=${filter}`;
      }
      
      if (sort) {
        let sortField = 'createdAt';
        let sortOrder = -1;
        
        switch(sort) {
          case 'newest':
            sortField = 'createdAt';
            sortOrder = -1;
            break;
          case 'oldest':
            sortField = 'createdAt';
            sortOrder = 1;
            break;
          case 'price-high':
            sortField = 'price';
            sortOrder = -1;
            break;
          case 'price-low':
            sortField = 'price';
            sortOrder = 1;
            break;
          case 'stock-high':
            sortField = 'stock';
            sortOrder = -1;
            break;
          case 'stock-low':
            sortField = 'stock';
            sortOrder = 1;
            break;
        }
        
        query += `&sortField=${sortField}&sortOrder=${sortOrder}`;
      }
      
      const response = await fetch(`/api/products?${query}`);
      const data = await response.json();
      setRows(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error('Error applying filters:', error);
      showNotification('Failed to apply filters', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    setPage(0);
    applyFilters();
  };

  // Reset all filters
  const handleReset = () => {
    setSearchText('');
    setFilter('all');
    setSort('newest');
    setPage(0);
    fetchProducts();
  };

  // Open add new product dialog
  const openAddDialog = () => {
    setDialogMode('add');
    setCurrentProduct({
      ...blankProduct,
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setDialogOpen(true);
  };

  // Open edit product dialog
  const openEditDialog = (product) => {
    setDialogMode('edit');
    setCurrentProduct({
      ...product,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt)
    });
    setDialogOpen(true);
  };

  // Open add existing products dialog
  const openAddExistingDialog = () => {
    setSelectedExistingProducts([]);
    setAddExistingDialogOpen(true);
  };

  // Handle product save
  const saveProduct = async () => {
    // Validation
    if (!currentProduct.name.trim()) {
      showNotification('Product name is required', 'error');
      return;
    }
    
    if (currentProduct.price <= 0) {
      showNotification('Price must be greater than 0', 'error');
      return;
    }
    
    if (currentProduct.stock < 0) {
      showNotification('Stock cannot be negative', 'error');
      return;
    }

    try {
      let response;
      let successMessage;
      
      if (dialogMode === 'add') {
        response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentProduct),
        });
        successMessage = 'Product added successfully';
      } else {
        response = await fetch(`/api/products/${currentProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentProduct),
        });
        successMessage = 'Product updated successfully';
      }

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      showNotification(successMessage, 'success');
      setDialogOpen(false);
      applyFilters();
    } catch (error) {
      console.error('Error saving product:', error);
      showNotification('Failed to save product', 'error');
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      showNotification('Product deleted successfully', 'success');
      applyFilters();
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('Failed to delete product', 'error');
    }
  };

  // Add existing products
  const addExistingProducts = async () => {
    if (selectedExistingProducts.length === 0) {
      showNotification('Please select at least one product', 'error');
      return;
    }
    
    try {
      const response = await fetch('/api/products/increase-stock', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds: selectedExistingProducts }),
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      showNotification('Selected products stock increased', 'success');
      setAddExistingDialogOpen(false);
      applyFilters();
    } catch (error) {
      console.error('Error increasing stock:', error);
      showNotification('Failed to update stock', 'error');
    }
  };

  // Show notification
  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrentProduct({
      ...currentProduct,
      category: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    applyFilters();
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    applyFilters();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ height: '100vh', overflow: 'auto', bgcolor: 'background.default', p: 3 }}>
        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseNotification} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        {/* Add/Edit Product Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            <InventoryIcon sx={{ mr: 1 }} />
            {dialogMode === 'add' ? 'Add New Product' : 'Edit Product'}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Product Name"
                  fullWidth
                  margin="normal"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  required
                />
                
                <TextField
                  label="SKU"
                  fullWidth
                  margin="normal"
                  value={currentProduct.sku}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
                  required
                  disabled={dialogMode === 'edit'}
                />
                
                <TextField
                  label="Description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                />
                
                <FormControl fullWidth margin="normal">
                  <InputLabel>Categories</InputLabel>
                  <Select
                    multiple
                    value={currentProduct.category}
                    onChange={handleCategoryChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Price ($)"
                      fullWidth
                      margin="normal"
                      type="number"
                      value={currentProduct.price}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
                      InputProps={{
                        startAdornment: <PriceIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Cost ($)"
                      fullWidth
                      margin="normal"
                      type="number"
                      value={currentProduct.cost}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, cost: parseFloat(e.target.value) || 0 })}
                      InputProps={{
                        startAdornment: <PriceIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                      }}
                    />
                  </Grid>
                </Grid>
                
                <TextField
                  label="Stock Quantity"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) || 0 })}
                  InputProps={{
                    startAdornment: <StockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                  required
                />
                
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={currentProduct.status}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Discontinued">Discontinued</MenuItem>
                  </Select>
                </FormControl>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <DatePicker
                      label="Created Date"
                      value={currentProduct.createdAt}
                      onChange={(date) => setCurrentProduct({ ...currentProduct, createdAt: date })}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                      disabled={dialogMode === 'add'}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DatePicker
                      label="Updated Date"
                      value={currentProduct.updatedAt}
                      onChange={(date) => setCurrentProduct({ ...currentProduct, updatedAt: date })}
                      renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={saveProduct} color="primary">
              {dialogMode === 'add' ? 'Create Product' : 'Update Product'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Existing Products Dialog */}
        <Dialog open={addExistingDialogOpen} onClose={() => setAddExistingDialogOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            <AddIcon sx={{ mr: 1 }} />
            Add Existing Products to Inventory
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Select products to increase their stock quantity by 1 unit each:
            </Typography>
            
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell padding="checkbox">
                        <input
                          type="checkbox"
                          checked={selectedExistingProducts.includes(product._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedExistingProducts([...selectedExistingProducts, product._id]);
                            } else {
                              setSelectedExistingProducts(selectedExistingProducts.filter(id => id !== product._id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {product.image ? (
                            <Avatar src={product.image} sx={{ width: 40, height: 40, mr: 2 }} />
                          ) : (
                            <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.main' }}>
                              {product.name.charAt(0)}
                            </Avatar>
                          )}
                          <Typography>{product.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Badge
                          badgeContent={product.stock}
                          color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                          sx={{ mr: 2 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddExistingDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={addExistingProducts} 
              color="primary"
              disabled={selectedExistingProducts.length === 0}
            >
              Add Selected ({selectedExistingProducts.length})
            </Button>
          </DialogActions>
        </Dialog>

        {/* Main Content */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" fontWeight={700} sx={{ display: 'flex', alignItems: 'center' }}>
              <InventoryIcon sx={{ mr: 1, fontSize: 'inherit' }} />
              Product Inventory
            </Typography>
            <Box>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={openAddDialog}
                sx={{ mr: 1 }}
              >
                New Product
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />} 
                onClick={openAddExistingDialog}
              >
                Add Existing
              </Button>
            </Box>
          </Box>
          
          <Typography variant="body1" color="text.secondary">
            Manage your product catalog, inventory, and pricing in one place.
          </Typography>
        </Box>

        {/* Filters and Search */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Search products..."
                fullWidth
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Discontinued">Discontinued</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="price-high">Price (High to Low)</MenuItem>
                  <MenuItem value="price-low">Price (Low to High)</MenuItem>
                  <MenuItem value="stock-high">Stock (High to Low)</MenuItem>
                  <MenuItem value="stock-low">Stock (Low to High)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  onClick={handleSearch}
                  fullWidth
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleReset}
                  fullWidth
                  startIcon={<RefreshIcon />}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', mr: 2 }}>
                <InventoryIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Products</Typography>
                <Typography variant="h5" fontWeight={700}>{total}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark', mr: 2 }}>
                <CategoryIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Categories</Typography>
                <Typography variant="h5" fontWeight={700}>{categories.length}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.dark', mr: 2 }}>
                <StockIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Low Stock</Typography>
                <Typography variant="h5" fontWeight={700}>
                  {rows.filter(p => p.stock > 0 && p.stock <= 10).length}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'error.light', color: 'error.dark', mr: 2 }}>
                <DeleteIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Out of Stock</Typography>
                <Typography variant="h5" fontWeight={700}>
                  {rows.filter(p => p.stock === 0).length}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Products Table */}
        <Paper sx={{ overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{
                  '& th': { 
                    fontWeight: 600,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
                  },
                }}>
                  <TableCell width="50px">#</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Stock</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography>Loading products...</Typography>
                    </TableCell>
                  </TableRow>
                ) : rows.length > 0 ? (
                  rows.map((row, index) => (
                    <StyledTableRow key={row._id} hover>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {row.image ? (
                            <Avatar src={row.image} sx={{ width: 40, height: 40, mr: 2 }} />
                          ) : (
                            <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.main' }}>
                              {row.name.charAt(0)}
                            </Avatar>
                          )}
                          <Box>
                            <Typography fontWeight={600}>{row.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{row.sku}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {row.category.map(cat => (
                            <CategoryChip key={cat} label={cat} size="small" />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>${row.price.toFixed(2)}</Typography>
                        {row.cost > 0 && (
                          <Typography variant="body2" color="text.secondary">
                            Cost: ${row.cost.toFixed(2)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Badge
                          badgeContent={row.stock}
                          color={row.stock > 10 ? 'success' : row.stock > 0 ? 'warning' : 'error'}
                          sx={{ mr: 2 }}
                        />
                      </TableCell>
                      <TableCell>
                        <StatusChip label={row.status} status={row.status} size="small" />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            onClick={() => openEditDialog(row)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            size="small" 
                            onClick={() => deleteProduct(row._id)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <InventoryIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 1 }} />
                        <Typography color="text.secondary">No products found</Typography>
                        <Button 
                          variant="text" 
                          onClick={openAddDialog}
                          startIcon={<AddIcon />}
                          sx={{ mt: 2 }}
                        >
                          Add your first product
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              '& .MuiTablePagination-toolbar': {
                paddingLeft: 2,
                paddingRight: 1,
              },
            }}
          />
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}



// 'use client';
// import React, { useState, useEffect } from 'react';
// import {
//   Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, TablePagination, Chip, IconButton, Tooltip, Dialog,
//   DialogTitle, DialogContent, DialogActions, MenuItem, FormControl, InputLabel,
//   Select, useTheme, styled, Snackbar, Alert, Avatar, Badge, Divider, Grid
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   Refresh as RefreshIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Inventory as InventoryIcon,
//   Category as CategoryIcon,
//   AttachMoney as PriceIcon,
//   Numbers as StockIcon,
//   Description as DescriptionIcon,
// } from '@mui/icons-material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// // Custom styled components
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': { 
//     backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
//   },
//   '&:hover': {
//     backgroundColor: theme.palette.action.hover,
//   },
// }));

// const StatusChip = styled(Chip)(({ theme, status }) => ({
//   fontWeight: 600,
//   backgroundColor:
//     status === 'Active'
//       ? theme.palette.success.light
//       : status === 'Draft'
//       ? theme.palette.warning.light
//       : theme.palette.error.light,
//   color:
//     status === 'Active'
//       ? theme.palette.success.dark
//       : status === 'Draft'
//       ? theme.palette.warning.dark
//       : theme.palette.error.dark,
// }));

// const CategoryChip = styled(Chip)(({ theme }) => ({
//   marginRight: theme.spacing(0.5),
//   marginBottom: theme.spacing(0.5),
// }));

// export default function Products() {
//   const theme = useTheme();
//   const [searchText, setSearchText] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filter, setFilter] = useState('all');
//   const [sort, setSort] = useState('newest');

//   // Dialog states
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState('add');
//   const [addExistingDialogOpen, setAddExistingDialogOpen] = useState(false);
//   const [selectedExistingProducts, setSelectedExistingProducts] = useState([]);

//   // Notification state
//   const [notification, setNotification] = useState({
//     open: false,
//     message: '',
//     severity: 'success',
//   });

//   // Blank product template
//   const blankProduct = { 
//     id: null, 
//     name: '', 
//     description: '', 
//     price: 0, 
//     cost: 0,
//     stock: 0,
//     sku: '',
//     category: [],
//     status: 'Active',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     image: '',
//   };

//   const [currentProduct, setCurrentProduct] = useState(blankProduct);
//   const [rows, setRows] = useState([]);
//   const [total, setTotal] = useState(0);

//   // Sample categories for demo
//   const categories = [
//     'Electronics', 'Clothing', 'Home & Garden', 
//     'Books', 'Toys', 'Sports', 'Beauty', 'Food'
//   ];

//   // LocalStorage operations
//   const LS_KEY = 'products';
//   const readLS = () => JSON.parse(localStorage.getItem(LS_KEY) || '[]');
//   const writeLS = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data));

//   // Initialize data
//   useEffect(() => {
//     const demoProducts = [
//       {
//         id: 1,
//         name: 'Premium Wireless Headphones',
//         description: 'Noise-cancelling wireless headphones with 30-hour battery life',
//         price: 199.99,
//         cost: 89.99,
//         stock: 45,
//         sku: 'HP-001',
//         category: ['Electronics', 'Audio'],
//         status: 'Active',
//         createdAt: new Date('2023-01-15'),
//         updatedAt: new Date('2023-05-20'),
//         image: '/images/headphones.jpg',
//       },
//       {
//         id: 2,
//         name: 'Organic Cotton T-Shirt',
//         description: '100% organic cotton t-shirt available in multiple colors',
//         price: 29.99,
//         cost: 12.50,
//         stock: 120,
//         sku: 'CL-002',
//         category: ['Clothing'],
//         status: 'Active',
//         createdAt: new Date('2023-02-10'),
//         updatedAt: new Date('2023-06-15'),
//         image: '/images/tshirt.jpg',
//       },
//       {
//         id: 3,
//         name: 'Smart LED TV 55"',
//         description: '4K UHD Smart TV with HDR and built-in streaming apps',
//         price: 699.99,
//         cost: 450.00,
//         stock: 18,
//         sku: 'TV-003',
//         category: ['Electronics', 'Home'],
//         status: 'Active',
//         createdAt: new Date('2023-03-05'),
//         updatedAt: new Date('2023-07-10'),
//         image: '/images/tv.jpg',
//       },
//     ];

//     // Initialize with demo data if empty
//     if (!localStorage.getItem(LS_KEY)) {
//       writeLS(demoProducts);
//     }

//     const data = readLS();
//     setRows(data);
//     setTotal(data.length);
//   }, []);

//   // Apply filters and sorting
//   const applyFilters = () => {
//     let data = readLS();
    
//     // Apply search filter
//     if (searchText) {
//       data = data.filter(p =>
//         p.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         p.description.toLowerCase().includes(searchText.toLowerCase()) ||
//         p.sku.toLowerCase().includes(searchText.toLowerCase())
//       );
//     }
    
//     // Apply status filter
//     if (filter !== 'all') {
//       data = data.filter(p => p.status === filter);
//     }
    
//     // Apply sorting
//     if (sort === 'newest') {
//       data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     } else if (sort === 'oldest') {
//       data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//     } else if (sort === 'price-high') {
//       data.sort((a, b) => b.price - a.price);
//     } else if (sort === 'price-low') {
//       data.sort((a, b) => a.price - b.price);
//     } else if (sort === 'stock-high') {
//       data.sort((a, b) => b.stock - a.stock);
//     } else if (sort === 'stock-low') {
//       data.sort((a, b) => a.stock - b.stock);
//     }
    
//     setRows(data);
//     setTotal(data.length);
//     setPage(0);
//   };

//   // Handle search
//   const handleSearch = () => {
//     applyFilters();
//   };

//   // Reset all filters
//   const handleReset = () => {
//     setSearchText('');
//     setFilter('all');
//     setSort('newest');
//     const data = readLS();
//     setRows(data);
//     setTotal(data.length);
//     setPage(0);
//   };

//   // Open add new product dialog
//   const openAddDialog = () => {
//     setDialogMode('add');
//     setCurrentProduct({
//       ...blankProduct,
//       sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
//     });
//     setDialogOpen(true);
//   };

//   // Open edit product dialog
//   const openEditDialog = (product) => {
//     setDialogMode('edit');
//     setCurrentProduct(product);
//     setDialogOpen(true);
//   };

//   // Open add existing products dialog
//   const openAddExistingDialog = () => {
//     setSelectedExistingProducts([]);
//     setAddExistingDialogOpen(true);
//   };

//   // Handle product save
//   const saveProduct = () => {
//     const data = readLS();
    
//     // Validation
//     if (!currentProduct.name.trim()) {
//       showNotification('Product name is required', 'error');
//       return;
//     }
    
//     if (currentProduct.price <= 0) {
//       showNotification('Price must be greater than 0', 'error');
//       return;
//     }
    
//     if (currentProduct.stock < 0) {
//       showNotification('Stock cannot be negative', 'error');
//       return;
//     }

//     if (dialogMode === 'add') {
//       // Add new product
//       const newProduct = { 
//         ...currentProduct, 
//         id: Date.now(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       data.push(newProduct);
//       showNotification('Product added successfully', 'success');
//     } else {
//       // Update existing product
//       const index = data.findIndex(p => p.id === currentProduct.id);
//       if (index !== -1) {
//         data[index] = { 
//           ...currentProduct,
//           updatedAt: new Date(),
//         };
//         showNotification('Product updated successfully', 'success');
//       }
//     }

//     writeLS(data);
//     setDialogOpen(false);
//     applyFilters();
//   };

//   // Delete product
//   const deleteProduct = (id) => {
//     if (!confirm('Are you sure you want to delete this product?')) return;
    
//     const data = readLS().filter(p => p.id !== id);
//     writeLS(data);
//     showNotification('Product deleted successfully', 'success');
//     applyFilters();
//   };

//   // Add existing products
//   const addExistingProducts = () => {
//     if (selectedExistingProducts.length === 0) {
//       showNotification('Please select at least one product', 'error');
//       return;
//     }
    
//     const data = readLS();
//     const updatedData = data.map(product => {
//       if (selectedExistingProducts.includes(product.id)) {
//         return { ...product, stock: product.stock + 1 };
//       }
//       return product;
//     });
    
//     writeLS(updatedData);
//     setAddExistingDialogOpen(false);
//     showNotification('Selected products stock increased', 'success');
//     applyFilters();
//   };

//   // Show notification
//   const showNotification = (message, severity) => {
//     setNotification({
//       open: true,
//       message,
//       severity,
//     });
//   };

//   // Close notification
//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   // Handle category change
//   const handleCategoryChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setCurrentProduct({
//       ...currentProduct,
//       category: typeof value === 'string' ? value.split(',') : value,
//     });
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ height: '100vh', overflow: 'auto', bgcolor: 'background.default', p: 3 }}>
//         {/* Notification Snackbar */}
//         <Snackbar
//           open={notification.open}
//           autoHideDuration={6000}
//           onClose={handleCloseNotification}
//           anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >
//           <Alert 
//             onClose={handleCloseNotification} 
//             severity={notification.severity}
//             sx={{ width: '100%' }}
//           >
//             {notification.message}
//           </Alert>
//         </Snackbar>

//         {/* Add/Edit Product Dialog */}
//         <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
//           <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
//             <InventoryIcon sx={{ mr: 1 }} />
//             {dialogMode === 'add' ? 'Add New Product' : 'Edit Product'}
//           </DialogTitle>
//           <DialogContent dividers>
//             <Grid container spacing={3} sx={{ mt: 1 }}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Product Name"
//                   fullWidth
//                   margin="normal"
//                   value={currentProduct.name}
//                   onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
//                   required
//                 />
                
//                 <TextField
//                   label="SKU"
//                   fullWidth
//                   margin="normal"
//                   value={currentProduct.sku}
//                   onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
//                   required
//                   disabled={dialogMode === 'edit'}
//                 />
                
//                 <TextField
//                   label="Description"
//                   fullWidth
//                   margin="normal"
//                   multiline
//                   rows={4}
//                   value={currentProduct.description}
//                   onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
//                 />
                
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Categories</InputLabel>
//                   <Select
//                     multiple
//                     value={currentProduct.category}
//                     onChange={handleCategoryChange}
//                     renderValue={(selected) => (
//                       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                         {selected.map((value) => (
//                           <Chip key={value} label={value} size="small" />
//                         ))}
//                       </Box>
//                     )}
//                   >
//                     {categories.map((category) => (
//                       <MenuItem key={category} value={category}>
//                         {category}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <TextField
//                       label="Price ($)"
//                       fullWidth
//                       margin="normal"
//                       type="number"
//                       value={currentProduct.price}
//                       onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
//                       InputProps={{
//                         startAdornment: <PriceIcon sx={{ mr: 1, color: 'text.secondary' }} />,
//                       }}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       label="Cost ($)"
//                       fullWidth
//                       margin="normal"
//                       type="number"
//                       value={currentProduct.cost}
//                       onChange={(e) => setCurrentProduct({ ...currentProduct, cost: parseFloat(e.target.value) || 0 })}
//                       InputProps={{
//                         startAdornment: <PriceIcon sx={{ mr: 1, color: 'text.secondary' }} />,
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
                
//                 <TextField
//                   label="Stock Quantity"
//                   fullWidth
//                   margin="normal"
//                   type="number"
//                   value={currentProduct.stock}
//                   onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) || 0 })}
//                   InputProps={{
//                     startAdornment: <StockIcon sx={{ mr: 1, color: 'text.secondary' }} />,
//                   }}
//                   required
//                 />
                
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Status</InputLabel>
//                   <Select
//                     value={currentProduct.status}
//                     onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value })}
//                   >
//                     <MenuItem value="Active">Active</MenuItem>
//                     <MenuItem value="Draft">Draft</MenuItem>
//                     <MenuItem value="Discontinued">Discontinued</MenuItem>
//                   </Select>
//                 </FormControl>
                
//                 <Grid container spacing={2} sx={{ mt: 1 }}>
//                   <Grid item xs={6}>
//                     <DatePicker
//                       label="Created Date"
//                       value={currentProduct.createdAt}
//                       onChange={(date) => setCurrentProduct({ ...currentProduct, createdAt: date })}
//                       renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
//                       disabled={dialogMode === 'add'}
//                     />
//                   </Grid>
//                   <Grid item xs={6}>
//                     <DatePicker
//                       label="Updated Date"
//                       value={currentProduct.updatedAt}
//                       onChange={(date) => setCurrentProduct({ ...currentProduct, updatedAt: date })}
//                       renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
//                       disabled
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
//             <Button variant="contained" onClick={saveProduct} color="primary">
//               {dialogMode === 'add' ? 'Create Product' : 'Update Product'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Add Existing Products Dialog */}
//         <Dialog open={addExistingDialogOpen} onClose={() => setAddExistingDialogOpen(false)} fullWidth maxWidth="sm">
//           <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
//             <AddIcon sx={{ mr: 1 }} />
//             Add Existing Products to Inventory
//           </DialogTitle>
//           <DialogContent dividers>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               Select products to increase their stock quantity by 1 unit each:
//             </Typography>
            
//             <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//               <Table size="small" stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell padding="checkbox"></TableCell>
//                     <TableCell>Product</TableCell>
//                     <TableCell align="right">Stock</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rows.map((product) => (
//                     <TableRow key={product.id}>
//                       <TableCell padding="checkbox">
//                         <input
//                           type="checkbox"
//                           checked={selectedExistingProducts.includes(product.id)}
//                           onChange={(e) => {
//                             if (e.target.checked) {
//                               setSelectedExistingProducts([...selectedExistingProducts, product.id]);
//                             } else {
//                               setSelectedExistingProducts(selectedExistingProducts.filter(id => id !== product.id));
//                             }
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           {product.image ? (
//                             <Avatar src={product.image} sx={{ width: 40, height: 40, mr: 2 }} />
//                           ) : (
//                             <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.main' }}>
//                               {product.name.charAt(0)}
//                             </Avatar>
//                           )}
//                           <Typography>{product.name}</Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell align="right">
//                         <Badge
//                           badgeContent={product.stock}
//                           color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
//                           sx={{ mr: 2 }}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setAddExistingDialogOpen(false)}>Cancel</Button>
//             <Button 
//               variant="contained" 
//               onClick={addExistingProducts} 
//               color="primary"
//               disabled={selectedExistingProducts.length === 0}
//             >
//               Add Selected ({selectedExistingProducts.length})
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Main Content */}
//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h4" fontWeight={700} sx={{ display: 'flex', alignItems: 'center' }}>
//               <InventoryIcon sx={{ mr: 1, fontSize: 'inherit' }} />
//               Product Inventory
//             </Typography>
//             <Box>
//               <Button 
//                 variant="contained" 
//                 startIcon={<AddIcon />} 
//                 onClick={openAddDialog}
//                 sx={{ mr: 1 }}
//               >
//                 New Product
//               </Button>
//               <Button 
//                 variant="outlined" 
//                 startIcon={<AddIcon />} 
//                 onClick={openAddExistingDialog}
//               >
//                 Add Existing
//               </Button>
//             </Box>
//           </Box>
          
//           <Typography variant="body1" color="text.secondary">
//             Manage your product catalog, inventory, and pricing in one place.
//           </Typography>
//         </Box>

//         {/* Filters and Search */}
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Search products..."
//                 fullWidth
//                 size="small"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 InputProps={{
//                   startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
//                 }}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               />
//             </Grid>
//             <Grid item xs={6} md={2}>
//               <FormControl fullWidth size="small">
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                   label="Status"
//                 >
//                   <MenuItem value="all">All Statuses</MenuItem>
//                   <MenuItem value="Active">Active</MenuItem>
//                   <MenuItem value="Draft">Draft</MenuItem>
//                   <MenuItem value="Discontinued">Discontinued</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={6} md={2}>
//               <FormControl fullWidth size="small">
//                 <InputLabel>Sort By</InputLabel>
//                 <Select
//                   value={sort}
//                   onChange={(e) => setSort(e.target.value)}
//                   label="Sort By"
//                 >
//                   <MenuItem value="newest">Newest First</MenuItem>
//                   <MenuItem value="oldest">Oldest First</MenuItem>
//                   <MenuItem value="price-high">Price (High to Low)</MenuItem>
//                   <MenuItem value="price-low">Price (Low to High)</MenuItem>
//                   <MenuItem value="stock-high">Stock (High to Low)</MenuItem>
//                   <MenuItem value="stock-low">Stock (Low to High)</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 <Button 
//                   variant="contained" 
//                   onClick={handleSearch}
//                   fullWidth
//                   startIcon={<SearchIcon />}
//                 >
//                   Search
//                 </Button>
//                 <Button 
//                   variant="outlined" 
//                   onClick={handleReset}
//                   fullWidth
//                   startIcon={<RefreshIcon />}
//                 >
//                   Reset
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
//               <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', mr: 2 }}>
//                 <InventoryIcon />
//               </Avatar>
//               <Box>
//                 <Typography variant="body2" color="text.secondary">Total Products</Typography>
//                 <Typography variant="h5" fontWeight={700}>{total}</Typography>
//               </Box>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
//               <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark', mr: 2 }}>
//                 <CategoryIcon />
//               </Avatar>
//               <Box>
//                 <Typography variant="body2" color="text.secondary">Categories</Typography>
//                 <Typography variant="h5" fontWeight={700}>{categories.length}</Typography>
//               </Box>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
//               <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.dark', mr: 2 }}>
//                 <StockIcon />
//               </Avatar>
//               <Box>
//                 <Typography variant="body2" color="text.secondary">Low Stock</Typography>
//                 <Typography variant="h5" fontWeight={700}>
//                   {rows.filter(p => p.stock > 0 && p.stock <= 10).length}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
//               <Avatar sx={{ bgcolor: 'error.light', color: 'error.dark', mr: 2 }}>
//                 <DeleteIcon />
//               </Avatar>
//               <Box>
//                 <Typography variant="body2" color="text.secondary">Out of Stock</Typography>
//                 <Typography variant="h5" fontWeight={700}>
//                   {rows.filter(p => p.stock === 0).length}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Products Table */}
//         <Paper sx={{ overflow: 'hidden' }}>
//           <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
//             <Table stickyHeader size="small">
//               <TableHead>
//                 <TableRow sx={{
//                   '& th': { 
//                     fontWeight: 600,
//                     backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
//                   },
//                 }}>
//                   <TableCell width="50px">#</TableCell>
//                   <TableCell>Product</TableCell>
//                   <TableCell>Categories</TableCell>
//                   <TableCell align="right">Price</TableCell>
//                   <TableCell align="center">Stock</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell align="right">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.length > 0 ? (
//                   rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//                     <StyledTableRow key={row.id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           {row.image ? (
//                             <Avatar src={row.image} sx={{ width: 40, height: 40, mr: 2 }} />
//                           ) : (
//                             <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.main' }}>
//                               {row.name.charAt(0)}
//                             </Avatar>
//                           )}
//                           <Box>
//                             <Typography fontWeight={600}>{row.name}</Typography>
//                             <Typography variant="body2" color="text.secondary">{row.sku}</Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                           {row.category.map(cat => (
//                             <CategoryChip key={cat} label={cat} size="small" />
//                           ))}
//                         </Box>
//                       </TableCell>
//                       <TableCell align="right">
//                         <Typography fontWeight={600}>${row.price.toFixed(2)}</Typography>
//                         {row.cost > 0 && (
//                           <Typography variant="body2" color="text.secondary">
//                             Cost: ${row.cost.toFixed(2)}
//                           </Typography>
//                         )}
//                       </TableCell>
//                       <TableCell align="center">
//                         <Badge
//                           badgeContent={row.stock}
//                           color={row.stock > 10 ? 'success' : row.stock > 0 ? 'warning' : 'error'}
//                           sx={{ mr: 2 }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <StatusChip label={row.status} status={row.status} size="small" />
//                       </TableCell>
//                       <TableCell align="right">
//                         <Tooltip title="Edit">
//                           <IconButton 
//                             size="small" 
//                             onClick={() => openEditDialog(row)}
//                             color="primary"
//                           >
//                             <EditIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton 
//                             size="small" 
//                             onClick={() => deleteProduct(row.id)}
//                             color="error"
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </StyledTableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                         <InventoryIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 1 }} />
//                         <Typography color="text.secondary">No products found</Typography>
//                         <Button 
//                           variant="text" 
//                           onClick={openAddDialog}
//                           startIcon={<AddIcon />}
//                           sx={{ mt: 2 }}
//                         >
//                           Add your first product
//                         </Button>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25, 50]}
//             component="div"
//             count={total}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={(_, newPage) => setPage(newPage)}
//             onRowsPerPageChange={(e) => {
//               setRowsPerPage(parseInt(e.target.value, 10));
//               setPage(0);
//             }}
//             sx={{
//               borderTop: `1px solid ${theme.palette.divider}`,
//               '& .MuiTablePagination-toolbar': {
//                 paddingLeft: 2,
//                 paddingRight: 1,
//               },
//             }}
//           />
//         </Paper>
//       </Box>
//     </LocalizationProvider>
//   );
// }