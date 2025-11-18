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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Visibility, Edit, Delete, Search } from '@mui/icons-material';
import { Footer } from '@/components/layout/Footer';
import { usePosts, useDeletePost } from '@/hooks/usePosts';
import { Post } from '@/types/post';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material';

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const { data: posts = [], isLoading, error } = usePosts();
  const deletePostMutation = useDeletePost();
  const { enqueueSnackbar } = useSnackbar();

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase().trim();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.id.toString().includes(query)
    );
  }, [searchQuery, posts]);

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        await deletePostMutation.mutateAsync(postToDelete.id);
        enqueueSnackbar('Post deleted successfully', { variant: 'success' });
        setDeleteDialogOpen(false);
        setPostToDelete(null);
      } catch (error) {
        enqueueSnackbar('Failed to delete post', { variant: 'error' });
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };
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

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ py: 4 }}>
            <Typography variant="body1" color="error">
              Failed to load posts. Please try again later.
            </Typography>
          </Box>
        ) : (
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
                        onClick={() => handleDeleteClick(post)}
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
        )}

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Delete Post</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} disabled={deletePostMutation.isPending}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
              autoFocus
              disabled={deletePostMutation.isPending}
            >
              {deletePostMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </Box>
  );
}

