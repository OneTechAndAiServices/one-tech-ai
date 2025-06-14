

// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Select,
//   MenuItem,
//   IconButton,
//   TextField,
//   Paper,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { Edit, Save, Cancel } from "@mui/icons-material";
// import axios from "axios";

// // All 7 days
// const allDays = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// // Default time slot
// const defaultHours = "9:00 AM to 5:00 PM";

// export default function AdminTimings() {
//   const [timings, setTimings] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editValue, setEditValue] = useState("");
//   const [editStatus, setEditStatus] = useState("available");

//   // Load timings from DB
//   useEffect(() => {
//     fetchTimings();
//   }, []);

//   const fetchTimings = async () => {
//     try {
//       const res = await axios.get("/api/timings");
//       const dataFromDb = res.data.data;

//       // Ensure all days are covered
//       const completeTimings = allDays.map((day) => {
//         const found = dataFromDb.find((item) => item.day === day);
//         return {
//           day,
//           hours: found ? found.hours : defaultHours,
//         };
//       });

//       setTimings(completeTimings);
//     } catch (error) {
//       console.error("Failed to fetch timings:", error);
//     }
//   };

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     const current = timings[index];
//     setEditValue(current.hours === "Not Available Today" ? "" : current.hours);
//     setEditStatus(
//       current.hours === "Not Available Today" ? "not-available" : "available"
//     );
//   };

//   const handleSave = async (index) => {
//     const updated = [...timings];
//     const updatedHours =
//       editStatus === "not-available" ? "Not Available Today" : editValue;

//     const day = updated[index].day;
//     updated[index].hours = updatedHours;

//     try {
//       // Update backend
//       await axios.put("/api/timings", {
//         day,
//         hours: updatedHours,
//       });

//       setTimings(updated);
//       setEditingIndex(null);
//       setEditValue("");
//       setEditStatus("available");
//     } catch (error) {
//       console.error("Error saving timing:", error);
//     }
//   };

//   const handleCancel = () => {
//     setEditingIndex(null);
//     setEditValue("");
//     setEditStatus("available");
//   };

//   return (
//     <Box sx={{ px: 4, py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Manage Weekly Timings
//       </Typography>

//       {timings.map((entry, index) => (
//         <Paper key={index} sx={{ p: 2, mb: 2 }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={3}>
//               <Typography variant="h6">{entry.day}</Typography>
//             </Grid>

//             {editingIndex === index ? (
//               <>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth>
//                     <InputLabel>Status</InputLabel>
//                     <Select
//                       value={editStatus}
//                       label="Status"
//                       onChange={(e) => setEditStatus(e.target.value)}
//                     >
//                       <MenuItem value="available">Available</MenuItem>
//                       <MenuItem value="not-available">
//                         Not Available Today
//                       </MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 {editStatus === "available" && (
//                   <Grid item xs={12} md={3}>
//                     <TextField
//                       fullWidth
//                       label="Timing"
//                       value={editValue}
//                       onChange={(e) => setEditValue(e.target.value)}
//                     />
//                   </Grid>
//                 )}

//                 <Grid item xs={12} md={2}>
//                   <IconButton color="success" onClick={() => handleSave(index)}>
//                     <Save />
//                   </IconButton>
//                   <IconButton color="warning" onClick={handleCancel}>
//                     <Cancel />
//                   </IconButton>
//                 </Grid>
//               </>
//             ) : (
//               <>
//                 <Grid item xs={12} md={7}>
//                   <Typography variant="body1">{entry.hours}</Typography>
//                 </Grid>
//                 <Grid item xs={12} md={2}>
//                   <Button
//                     variant="outlined"
//                     onClick={() => handleEdit(index)}
//                     startIcon={<Edit fontSize="small" />}
//                   >
//                     Edit
//                   </Button>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </Paper>
//       ))}

//       {/* Console Debug */}
//       <Box mt={4}>
//         <Typography variant="h6">Console Output:</Typography>
//         <pre>{JSON.stringify(timings, null, 2)}</pre>
//       </Box>
//     </Box>
//   );
// }
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  IconButton,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  useTheme,
  Tooltip ,
  styled
} from '@mui/material';
import { Edit, Save, Cancel, Refresh } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: '12px',
  boxShadow: theme.shadows[5],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[10],
    transform: 'translateY(-2px)'
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  padding: theme.spacing(1, 2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

// Constants
const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const defaultHours = "9:00 AM to 5:00 PM";

export default function AdminTimings() {
  const theme = useTheme();
  const [timings, setTimings] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editStatus, setEditStatus] = useState("available");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Load timings from DB
  useEffect(() => {
    fetchTimings();
  }, []);

  const fetchTimings = async () => {
    try {
      setFetching(true);
      const res = await axios.get("/api/timings");
      const dataFromDb = res.data.data;

      // Ensure all days are covered
      const completeTimings = allDays.map((day) => {
        const found = dataFromDb.find((item) => item.day === day);
        return {
          day,
          hours: found ? found.hours : defaultHours,
          status: found?.hours === "Not Available Today" ? "not-available" : "available"
        };
      });

      setTimings(completeTimings);
    } catch (error) {
      console.error("Failed to fetch timings:", error);
      setError("Failed to load timings. Please try again.");
    } finally {
      setFetching(false);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const current = timings[index];
    setEditValue(current.status === "not-available" ? "" : current.hours);
    setEditStatus(current.status);
  };

  const handleSave = async (index) => {
    try {
      setLoading(true);
      const updated = [...timings];
      const updatedHours = editStatus === "not-available" ? "Not Available Today" : editValue;
      const day = updated[index].day;

      // Update backend
      await axios.put("/api/timings", {
        day,
        hours: updatedHours,
      });

      updated[index] = {
        ...updated[index],
        hours: updatedHours,
        status: editStatus
      };

      setTimings(updated);
      setEditingIndex(null);
      setEditValue("");
      setEditStatus("available");
      setSuccess("Timing updated successfully!");
    } catch (error) {
      console.error("Error saving timing:", error);
      setError("Failed to update timing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue("");
    setEditStatus("available");
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
      {/* Header with animated gradient */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Manage Weekly Timings
        </Typography>
        
        <Tooltip title="Refresh Timings">
          <IconButton onClick={fetchTimings} disabled={fetching}>
            <Refresh color={fetching ? 'disabled' : 'primary'} />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Loading State */}
      {fetching ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (
        <AnimatePresence>
          {timings.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <StyledPaper>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight={600}>
                      {entry.day}
                    </Typography>
                  </Grid>

                  {editingIndex === index ? (
                    <>
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={editStatus}
                            label="Status"
                            onChange={(e) => setEditStatus(e.target.value)}
                          >
                            <MenuItem value="available">Available</MenuItem>
                            <MenuItem value="not-available">
                              Not Available Today
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {editStatus === "available" && (
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Timing"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        </Grid>
                      )}

                      <Grid item xs={12} md={2}>
                        <IconButton 
                          color="success" 
                          onClick={() => handleSave(index)}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} /> : <Save />}
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={handleCancel}
                          disabled={loading}
                        >
                          <Cancel />
                        </IconButton>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12} md={7}>
                        <Typography 
                          variant="body1" 
                          color={entry.status === "not-available" ? "error" : "textPrimary"}
                          fontWeight={500}
                        >
                          {entry.hours}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <ActionButton
                          variant="outlined"
                          onClick={() => handleEdit(index)}
                          startIcon={<Edit fontSize="small" />}
                        >
                          Edit
                        </ActionButton>
                      </Grid>
                    </>
                  )}
                </Grid>
              </StyledPaper>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

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