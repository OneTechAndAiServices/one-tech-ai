"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function AdminNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNews, setEditingNews] = useState(null); // null means "new"
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setNewsList(data);
    } catch (error) {
      alert("Failed to fetch news. Please try again later.");
    }
    setLoading(false);
  }

  // Open dialog for editing or adding new
  function handleOpenDialog(news = null) {
    if (news) {
      setEditingNews(news);
      setTitle(news.title);
      setDescription(news.description);
    } else {
      setEditingNews(null);
      setTitle("");
      setDescription("");
    }
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    setEditingNews(null);
    setTitle("");
    setDescription("");
  }

  async function handleSave() {
    if (!title.trim() || !description.trim()) {
      alert("Title and Description cannot be empty.");
      return;
    }

    // Prepare body: if editing existing, include id, else no id for new item
    const body = editingNews
      ? { id: editingNews._id, title: title.trim(), description: description.trim() }
      : { title: title.trim(), description: description.trim() };

    try {
      const res = await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        await fetchNews();
        handleCloseDialog();
      } else {
        alert("Failed to save news. Please try again.");
      }
    } catch (error) {
      alert("Error saving news. Please check your connection.");
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin - Manage News (Add/Edit)
      </Typography>

      <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
        Add News
      </Button>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : newsList.length === 0 ? (
       <Typography sx={{ mt: 4 }}>
  No news items found. Use the &quot;Add News&quot; button above to create a new news item.
</Typography>

      ) : (
        <List sx={{maxWidth:"800px",mx:"auto"}}>
          {newsList.map((news) => (
            <ListItem
            
              key={news._id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleOpenDialog(news)} aria-label="edit news">
                  <EditIcon />
                </IconButton>
              }
            >
              <ListItemText primary={news.title} secondary={news.description} />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingNews ? "Edit News" : "Add News"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingNews ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
