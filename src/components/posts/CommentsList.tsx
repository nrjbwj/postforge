'use client';

import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import { Comment } from '@/types/post';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { EmptyState } from '@/components/common/EmptyState';

interface CommentsListProps {
  comments: Comment[];
  isLoading: boolean;
  error: Error | null;
}

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message="Failed to load comments. Please try again later."
        variant="text"
      />
    );
  }

  if (comments.length === 0) {
    return (
      <EmptyState
        message="No comments yet. Be the first to comment!"
        title="No Comments"
      />
    );
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
        Comments ({comments.length})
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {comments.map((comment) => (
          <Card key={comment.id} variant="outlined">
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" fontWeight={600} color="primary">
                  {comment.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {comment.email}
                </Typography>
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {comment.body}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

