'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { usePost, useUpdatePost } from '@/hooks/usePosts';
import { useSnackbar } from 'notistack';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = useMemo(() => {
    const id = params?.id as string;
    return id ? parseInt(id, 10) : 0;
  }, [params?.id]);
  const { data: post, isLoading, error } = usePost(postId);
  const updatePostMutation = useUpdatePost();
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (error || !post) {
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
              Post Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {error ? 'Failed to load post. Please try again later.' : 'The post you&apos;re looking for doesn&apos;t exist.'}
            </Typography>
          </Box>
          <Link href="/posts" style={{ textDecoration: 'none' }}>
            <Button variant="contained">Back to Posts</Button>
          </Link>
        </Container>
        <Footer />
      </Box>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      enqueueSnackbar('Please fill in all fields', { variant: 'error' });
      return;
    }

    try {
      const updatedPost = await updatePostMutation.mutateAsync({
        id: postId,
        title: title.trim(),
        body: body.trim(),
        userId: post.userId,
      });
      enqueueSnackbar('Post updated successfully!', { variant: 'success' });
      router.push(`/posts/${updatedPost.id}`);
    } catch {
      enqueueSnackbar('Failed to update post', { variant: 'error' });
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
          <Link href={`/posts/${postId}`} style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <Button variant="outlined" size="small">
              ← Back to Post
            </Button>
          </Link>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            Edit Post
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Update post details
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
                  <Link href={`/posts/${postId}`} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" disabled={updatePostMutation.isPending}>
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" variant="contained" disabled={updatePostMutation.isPending}>
                    {updatePostMutation.isPending ? 'Updating...' : 'Update Post'}
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
