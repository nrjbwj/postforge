'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { Footer } from '@/components/layout/Footer';
import { useCreatePost } from '@/hooks/usePosts';
import { useSnackbar } from 'notistack';
import Link from 'next/link';

export default function NewPostPage() {
  const router = useRouter();
  const createPostMutation = useCreatePost();
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      enqueueSnackbar('Please fill in all fields', { variant: 'error' });
      return;
    }

    try {
      const newPost = await createPostMutation.mutateAsync({
        title: title.trim(),
        body: body.trim(),
        userId: 1, // Using userId 1 for now
      });
      enqueueSnackbar('Post created successfully!', { variant: 'success' });
      router.push(`/posts/${newPost.id}`);
    } catch (error) {
      enqueueSnackbar('Failed to create post', { variant: 'error' });
    }
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
        <Box sx={{ mb: 3 }}>
          <Link href="/posts" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <Button variant="outlined" size="small">
              ← Back to Posts
            </Button>
          </Link>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            Create New Post
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add a new post to your collection
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Title"
                  fullWidth
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                />
                <TextField
                  label="Body"
                  fullWidth
                  required
                  multiline
                  rows={8}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter post content..."
                />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Link href="/posts" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" disabled={createPostMutation.isPending}>
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" variant="contained" disabled={createPostMutation.isPending}>
                    {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
                  </Button>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </Box>
  );
}
