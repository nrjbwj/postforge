'use client';

import { Typography, Box, Card, CardContent, Button, Divider } from '@mui/material';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { BackButton } from '@/components/common/BackButton';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { CommentsList } from '@/components/posts/CommentsList';
import { usePost, useComments } from '@/hooks/usePosts';
import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';

export default function PostDetailsPage() {
  const params = useParams();
  const postId = useMemo(() => {
    const id = params?.id as string;
    return id ? parseInt(id, 10) : 0;
  }, [params?.id]);
  const { data: post, isLoading, error } = usePost(postId);
  const { data: comments = [], isLoading: commentsLoading, error: commentsError } = useComments(postId);

  if (isLoading) {
    return (
      <PageLayout>
        <LoadingSpinner fullHeight />
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <PageHeader
          title="Post Not Found"
          subtitle={error ? 'Failed to load post. Please try again later.' : "The post you're looking for doesn't exist."}
        />
        <Link href="/posts" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Back to Posts</Button>
        </Link>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <BackButton href="/posts" label="Back to Posts" />

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

        {/* Comments Section */}
        <Box sx={{ mt: 4 }}>
          <CommentsList
            comments={comments}
            isLoading={commentsLoading}
            error={commentsError}
          />
        </Box>
    </PageLayout>
  );
}

