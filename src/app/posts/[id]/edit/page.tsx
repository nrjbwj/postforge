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
import { usePosts } from '@/contexts/PostsContext';
import { useSnackbar } from 'notistack';
import Link from 'next/link';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { getPost, updatePost } = usePosts();
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postId = useMemo(() => {
    const id = params?.id as string;
    return id ? parseInt(id, 10) : 0;
  }, [params?.id]);
  const post = useMemo(() => getPost(postId), [getPost, postId]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  if (!post) {
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
              The post you&apos;re looking for doesn&apos;t exist.
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

    setIsSubmitting(true);
    try {
      const updatedPost = updatePost(postId, title.trim(), body.trim());
      if (updatedPost) {
        enqueueSnackbar('Post updated successfully!', { variant: 'success' });
        router.push(`/posts/${updatedPost.id}`);
      } else {
        enqueueSnackbar('Failed to update post', { variant: 'error' });
      }
    } catch {
      enqueueSnackbar('Failed to update post', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
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
                    <Button variant="outlined" disabled={isSubmitting}>
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Post'}
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
