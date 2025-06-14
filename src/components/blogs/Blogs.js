"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  useTheme,
  Alert,
} from "@mui/material";

const Blogs = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const controller = new AbortController();
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    return () => controller.abort();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: { xs: 4, md: 8 }, minHeight: "80vh" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        color={theme.palette.primary.main}
      >
        Latest Blogs & News
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Grid size={{xs:12, md:4}} key={i}>
                <Skeleton variant="rectangular" height={180} />
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </Grid>
            ))
          : news.map((item) => (
              <Grid size={{xs:12, md:4}} key={item._id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="text.primary"
                      gutterBottom
                    >
                      {item.title || "Untitled"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {item.description || "No description provided."}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ fontStyle: "italic" }}
                    >
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Blogs;
