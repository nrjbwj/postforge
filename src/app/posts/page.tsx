'use client';

import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Visibility, Edit, Delete, Search } from '@mui/icons-material';
import { Footer } from '@/components/layout/Footer';
import { mockPosts } from '@/data/mockPosts';
import { Post } from '@/types/post';
import Link from 'next/link';

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockPosts;
    }

    const query = searchQuery.toLowerCase().trim();
    return mockPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.id.toString().includes(query)
    );
  }, [searchQuery]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            Posts
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Manage and view all your posts
          </Typography>
          <TextField
            fullWidth
            placeholder="Search posts by title, body, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 500 }}
          />
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No posts found matching your search.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post: Post) => (
                <TableRow
                  key={post.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <TableCell>{post.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {post.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                        <IconButton size="small" color="primary" aria-label="view post">
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Link>
                      <Link href={`/posts/${post.id}/edit`} style={{ textDecoration: 'none' }}>
                        <IconButton size="small" color="primary" aria-label="edit post">
                          <Edit fontSize="small" />
                        </IconButton>
                      </Link>
                      <IconButton
                        size="small"
                        color="error"
                        aria-label="delete post"
                        onClick={() => {
                          // Delete functionality will be implemented later
                          console.log('Delete post:', post.id);
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </Box>
  );
}

