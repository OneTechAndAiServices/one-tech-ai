

// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Tooltip
// } from '@mui/material';
// import { Add, Edit, Delete } from '@mui/icons-material';

// export function Headlines() {
//   const [notices, setNotices] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [currentNotice, setCurrentNotice] = useState(null);
//   const [formData, setFormData] = useState({ title: '', text: '' });

//   // Fetch all notices
//   const fetchNotices = async () => {
//     try {
//       const res = await axios.get('/api/notices');
//       setNotices(res.data);
//     } catch (err) {
//       console.error('Error fetching notices:', err);
//     }
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   useEffect(() => {
//     if (!open) {
//       setFormData({ title: '', text: '' });
//       setCurrentNotice(null);
//     }
//   }, [open]);

//   const handleOpen = (notice = null) => {
//     if (notice) {
//       setCurrentNotice(notice);
//       setFormData({ title: notice.title, text: notice.text });
//     }
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (currentNotice) {
//         // Update notice (PUT) - send _id inside body
//         await axios.put('/api/notices', { _id: currentNotice._id, ...formData });
//       } else {
//         // Add new notice (POST)
//         await axios.post('/api/notices', formData);
//       }
//       fetchNotices();
//       handleClose();
//     } catch (err) {
//       console.error('Error saving notice:', err);
//     }
//   };

//   const handleDelete = async (_id) => {
//     try {
//       // Delete notice - send _id inside body
//       await axios.delete('/api/notices', { data: { _id } });
//       fetchNotices();
//     } catch (err) {
//       console.error('Error deleting notice:', err);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header and Add Button */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h5">Manage Notices</Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpen()}
//         >
//           Add Notice
//         </Button>
//       </Box>

//       {/* Notices Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>Content</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {notices.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={3} align="center">
//                   No notices available.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               notices.map((notice) => (
//                 <TableRow key={notice._id}>
//                   <TableCell>{notice.title}</TableCell>
//                   <TableCell sx={{ whiteSpace: 'pre-line' }}>{notice.text}</TableCell>
//                   <TableCell align="right">
//                     <Tooltip title="Edit">
//                       <IconButton onClick={() => handleOpen(notice)}>
//                         <Edit color="primary" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton onClick={() => handleDelete(notice._id)}>
//                         <Delete color="error" />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Scrolling Preview Bar */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           Notice Preview
//         </Typography>
//         <Box sx={{
//           width: '100%',
//           overflow: 'hidden',
//           backgroundColor: '#005eb8',
//           color: '#fff',
//           py: 1,
//           borderRadius: 1
//         }}>
//           <Box sx={{
//             display: 'inline-flex',
//             whiteSpace: 'nowrap',
//             animation: 'scroll 60s linear infinite',
//             '@keyframes scroll': {
//               '0%': { transform: 'translateX(0%)' },
//               '100%': { transform: 'translateX(-100%)' }
//             }
//           }}>
//             {[...notices, ...notices].map((notice, index) => (
//               <Typography
//                 key={`preview-${notice._id}-${index}`}
//                 component="span"
//                 sx={{
//                   mx: 4,
//                   fontSize: { xs: '0.85rem', md: '1rem' },
//                   display: 'inline-block',
//                 }}
//               >
//                 <strong>{notice.title}: </strong>{notice.text}
//               </Typography>
//             ))}
//           </Box>
//         </Box>
//       </Box>

//       {/* Dialog for Add/Edit */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>{currentNotice ? 'Edit Notice' : 'Add New Notice'}</DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               name="title"
//               label="Title"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               margin="dense"
//               name="text"
//               label="Content"
//               type="text"
//               fullWidth
//               variant="outlined"
//               multiline
//               rows={4}
//               value={formData.text}
//               onChange={handleChange}
//               required
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button type="submit" variant="contained">
//               {currentNotice ? 'Update' : 'Add'}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </Box>
//   );
// }
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  Fade,
  Zoom,
  useTheme,
  styled
} from '@mui/material';
import { Add, Edit, Delete, Refresh, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: theme.shadows[10],
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[16]
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  padding: theme.spacing(1.5, 3),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const ScrollingNotice = styled(Box)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: '8px',
  marginTop: theme.spacing(3)
}));

export function Headlines() {
  const theme = useTheme();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [formData, setFormData] = useState({ title: '', text: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Enhanced fetch with loading and error states
  const fetchNotices = async () => {
    try {
      setFetching(true);
      const res = await axios.get('/api/notices');
      setNotices(res.data);
    } catch (err) {
      console.error('Error fetching notices:', err);
      setError('Failed to fetch notices. Please try again.');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    if (!open) {
      setFormData({ title: '', text: '' });
      setCurrentNotice(null);
    }
  }, [open]);

  const handleOpen = (notice = null) => {
    if (notice) {
      setCurrentNotice(notice);
      setFormData({ title: notice.title, text: notice.text });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentNotice) {
        await axios.put('/api/notices', { _id: currentNotice._id, ...formData });
        setSuccess('Notice updated successfully!');
      } else {
        await axios.post('/api/notices', formData);
        setSuccess('Notice added successfully!');
      }
      fetchNotices();
      handleClose();
    } catch (err) {
      console.error('Error saving notice:', err);
      setError(err.response?.data?.message || 'Failed to save notice.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    try {
      setLoading(true);
      await axios.delete('/api/notices', { data: { _id } });
      setSuccess('Notice deleted successfully!');
      fetchNotices();
    } catch (err) {
      console.error('Error deleting notice:', err);
      setError('Failed to delete notice.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with animated gradient */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Manage Notices
        </Typography>
        
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Refresh">
            <IconButton onClick={fetchNotices} disabled={fetching}>
              <Refresh color={fetching ? 'disabled' : 'primary'} />
            </IconButton>
          </Tooltip>
          
          <ActionButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
          >
            Add Notice
          </ActionButton>
        </Box>
      </Box>

      {/* Notices Table with enhanced UI */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <StyledPaper>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Content</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fetching ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  ) : notices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No notices available.
                      </TableCell>
                    </TableRow>
                  ) : (
                    notices.map((notice) => (
                      <TableRow 
                        key={notice._id}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Typography fontWeight={500}>{notice.title}</Typography>
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'pre-line' }}>{notice.text}</TableCell>
                        <TableCell align="right">
                          <Tooltip title="Edit" arrow>
                            <IconButton onClick={() => handleOpen(notice)}>
                              <Edit color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete" arrow>
                            <IconButton onClick={() => handleDelete(notice._id)}>
                              <Delete color="error" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Scrolling Preview Bar */}
      {notices.length > 0 && (
        <ScrollingNotice>
          <Typography variant="h6" gutterBottom sx={{ color: 'inherit' }}>
            Notice Preview
          </Typography>
          <Box sx={{
            display: 'inline-flex',
            whiteSpace: 'nowrap',
            animation: 'scroll 60s linear infinite',
            '@keyframes scroll': {
              '0%': { transform: 'translateX(0%)' },
              '100%': { transform: 'translateX(-100%)' }
            }
          }}>
            {[...notices, ...notices].map((notice, index) => (
              <Box 
                key={`preview-${notice._id}-${index}`}
                component="span"
                sx={{
                  mx: 4,
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography component="strong" sx={{ fontWeight: 600 }}>
                  {notice.title}: 
                </Typography>
                <Typography component="span">{notice.text}</Typography>
              </Box>
            ))}
          </Box>
        </ScrollingNotice>
      )}

      {/* Enhanced Dialog for Add/Edit */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="sm"
        TransitionComponent={Zoom}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white
        }}>
          {currentNotice ? 'Edit Notice' : 'Add New Notice'}
          <IconButton onClick={handleClose} sx={{ color: 'inherit' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="text"
              label="Content"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={6}
              value={formData.text}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <ActionButton onClick={handleClose} variant="outlined">
              Cancel
            </ActionButton>
            <ActionButton 
              type="submit" 
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {currentNotice ? 'Update' : 'Add'}
            </ActionButton>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="error" 
          onClose={handleCloseAlert}
          elevation={6}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="success" 
          onClose={handleCloseAlert}
          elevation={6}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}