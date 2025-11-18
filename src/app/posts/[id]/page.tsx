'use client';

import { Container, Typography, Box, Card, CardContent, Button, Divider } from '@mui/material';
import { Footer } from '@/components/layout/Footer';
import { mockPosts } from '@/data/mockPosts';
import Link from 'next/link';
import { useMemo } from 'react';

export default function PostDetailsPage({ params }: { params: { id: string } }) {
  const post = useMemo(() => {
    const postId = parseInt(params.id, 10);
    return mockPosts.find((p) => p.id === postId);
  }, [params.id]);

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
              The post you're looking for doesn't exist.
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

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Post #{post.id}
              </Typography>
              <Typography variant="h4" component="h1" gutterBottom fontWeight={700} sx={{ mt: 1 }}>
                {post.title}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {post.body}
              </Typography>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Link href={`/posts/${post.id}/edit`} style={{ textDecoration: 'none' }}>
                <Button variant="contained">Edit Post</Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </Box>
  );
}

