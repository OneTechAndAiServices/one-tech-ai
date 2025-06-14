

// "use client"
// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const AdminNoticeEditor = () => {
//   const [notice, setNotice] = useState({ heading: '', description: '' });
//   const [loading, setLoading] = useState(false);
//   const [noticeId, setNoticeId] = useState(null); // Use null instead of empty string

//   useEffect(() => {
//     const fetchNotice = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get('/api/notice');
//         if (res.data && res.data.length > 0) {
//           setNoticeId(res.data[0]._id);
//           setNotice({
//             heading: res.data[0].heading || '', // Ensure it's always a string
//             description: res.data[0].description || ''
//           });
//         }
//       } catch (err) {
//         console.error('Error fetching notice:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotice();
//   }, []);

//   const handleChange = (e) => {
//     setNotice({ ...notice, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       if (!noticeId) {
//         alert('No notice ID found to update.');
//         return;
//       }

//       await fetch('/api/notice', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: noticeId, ...notice }),
//       });

//       alert('Notice updated successfully!');
//     } catch (err) {
//       console.error('Error updating notice:', err);
//       alert('Failed to update notice.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
//       <Typography variant="h5" gutterBottom>
//         Admin Notice Editor
//       </Typography>

//       {loading ? (
//         <Box display="flex" justifyContent="center" my={3}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           <TextField
//             fullWidth
//             label="Heading"
//             name="heading"
//             value={notice.heading}
//             onChange={handleChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={notice.description}
//             onChange={handleChange}
//             multiline
//             rows={4}
//             margin="normal"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             sx={{ mt: 2 }}
//           >
//             Update Notice
//           </Button>
//         </>
//       )}
//     </Paper>
//   );
// };

// export default AdminNoticeEditor;
// app/admin/AdminNoticeEditor.jsx



// "use client";
// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const AdminNoticeEditor = () => {
//   const [notice, setNotice] = useState({ heading: '', description: '' });
//   const [loading, setLoading] = useState(false);
//   const [noticeId, setNoticeId] = useState(null);

//   const fetchNotice = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/banner');
//       if (res.data) {
//         setNoticeId(res.data._id);
//         setNotice({
//           heading: res.data.heading || '',
//           description: res.data.description || '',
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching notice:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotice();
//   }, []);

//   const handleChange = (e) => {
//     setNotice({ ...notice, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!noticeId) return alert('No notice to update');

//     try {
//       setLoading(true);
//       await axios.put('/api/notice', { id: noticeId, ...notice });
//       alert('Notice updated successfully!');
//       fetchNotice(); // Refresh after update
//     } catch (err) {
//       console.error('Error updating notice:', err);
//       alert('Failed to update notice.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
//       <Typography variant="h5" gutterBottom>
//         Admin Notice Editor
//       </Typography>

//       {loading ? (
//         <Box display="flex" justifyContent="center" my={3}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           <TextField
//             fullWidth
//             label="Heading"
//             name="heading"
//             value={notice.heading}
//             onChange={handleChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={notice.description}
//             onChange={handleChange}
//             multiline
//             rows={4}
//             margin="normal"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             sx={{ mt: 2 }}
//           >
//             Update Notice
//           </Button>
//         </>
//       )}
//     </Paper>
//   );
// };

// export default AdminNoticeEditor;


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { TextField, Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
// import axios from 'axios';

// const AdminNoticeEditor = () => {
//   const [notice, setNotice] = useState({ heading: '', description: '' });
//   const [loading, setLoading] = useState(false);
//   const [noticeId, setNoticeId] = useState(null);

//   const fetchNotice = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/banner');
//       if (res.data) {
//         setNoticeId(res.data._id);
//         setNotice({
//           heading: res.data.heading || '',
//           description: res.data.description || '',
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching notice:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotice();
//   }, []);

//   const handleChange = (e) => {
//     setNotice({ ...notice, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!noticeId) return alert('No notice to update');

//     try {
//       setLoading(true);
//       await axios.put('/api/banner', { id: noticeId, ...notice });
//       alert('Notice updated successfully!');
//       fetchNotice();
//     } catch (err) {
//       console.error('Error updating notice:', err);
//       alert('Failed to update notice.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
//       <Typography variant="h5" gutterBottom>
//         Admin Banner Text Editor
//       </Typography>

//       {loading ? (
//         <Box display="flex" justifyContent="center" my={3}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           <TextField
//             fullWidth
//             label="Heading"
//             name="heading"
//             value={notice.heading}
//             onChange={handleChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={notice.description}
//             onChange={handleChange}
//             multiline
//             rows={4}
//             margin="normal"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             sx={{ mt: 2 }}
//           >
//             Update Notice
//           </Button>
//         </>
//       )}
//     </Paper>
//   );
// };

// export default AdminNoticeEditor;
'use client';
import React, { useEffect, useState } from 'react';
import { 
  TextField, Button, Paper, Typography, Box, CircularProgress,
  Alert, Snackbar, Divider, Switch, FormControlLabel, IconButton,
  Tooltip, useTheme, styled
} from '@mui/material';
import { Save, Refresh, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(5),
  borderRadius: '16px',
  boxShadow: theme.shadows[10],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[16]
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1.5, 3),
  borderRadius: '12px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const AdminNoticeEditor = () => {
  const theme = useTheme();
  const [notice, setNotice] = useState({ 
    heading: '', 
    description: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [noticeId, setNoticeId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchNotice = async () => {
    try {
      setFetching(true);
      const res = await axios.get('/api/banner');
      if (res.data) {
        setNoticeId(res.data._id);
        setNotice({
          heading: res.data.heading || '',
          description: res.data.description || '',
          isActive: res.data.isActive !== false
        });
        setLastUpdated(new Date(res.data.updatedAt || Date.now()));
      }
    } catch (err) {
      console.error('Error fetching notice:', err);
      setError('Failed to fetch notice. Please try again.');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusToggle = (e) => {
    setNotice(prev => ({ ...prev, isActive: e.target.checked }));
  };

  const handleSubmit = async () => {
    if (!noticeId) {
      setError('No notice to update');
      return;
    }

    try {
      setLoading(true);
      await axios.put('/api/banner', { 
        id: noticeId, 
        ...notice,
        updatedAt: new Date()
      });
      setSuccess('Notice updated successfully!');
      setLastUpdated(new Date());
      fetchNotice();
    } catch (err) {
      console.error('Error updating notice:', err);
      setError(err.response?.data?.message || 'Failed to update notice.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchNotice();
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StyledPaper>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Notice Editor
            </Typography>
            
            <Box display="flex" alignItems="center">
              {/* <FormControlLabel
                control={
                  <Switch
                    checked={notice.isActive}
                    onChange={handleStatusToggle}
                    color="primary"
                  />
                }
                label={notice.isActive ? "Active" : "Inactive"}
                sx={{ mr: 2 }}
              /> */}
              
              <Tooltip title="Refresh Data" arrow>
                <IconButton 
                  onClick={handleRefresh} 
                  color="primary"
                  disabled={fetching}
                  sx={{ mr: 1 }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Toggle Preview" arrow>
                <IconButton 
                  onClick={() => setShowPreview(!showPreview)} 
                  color="secondary"
                >
                  {showPreview ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {lastUpdated && (
            <Typography variant="caption" color="textSecondary" gutterBottom>
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          {fetching ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                label="Notice Heading"
                name="heading"
                value={notice.heading}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    fontSize: '1.25rem',
                    fontWeight: 500
                  }
                }}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={notice.description}
                onChange={handleChange}
                multiline
                rows={10}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }
                }}
              />

              <Box display="flex" justifyContent="flex-end" mt={4}>
                <ActionButton
                  variant="outlined"
                  color="secondary"
                  onClick={handleRefresh}
                  startIcon={<Refresh />}
                  disabled={loading}
                  sx={{ mr: 2 }}
                >
                  Refresh
                </ActionButton>
                
                <ActionButton
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </ActionButton>
              </Box>

              {showPreview && (
                <Box mt={4} p={3} border={1} borderColor="divider" borderRadius={2}>
                  <Typography variant="h5" gutterBottom>
                    {notice.heading || "Preview Heading"}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography whiteSpace="pre-wrap">
                    {notice.description || "Preview content will appear here"}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Typography variant="caption" color="textSecondary">
                      Status: {notice.isActive ? "Active" : "Inactive"}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          )}
        </StyledPaper>

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
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminNoticeEditor;