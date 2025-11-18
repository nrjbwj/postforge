'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import { Add, List } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export const QuickActions: React.FC = () => {
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
        Quick Actions
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Get started with common tasks
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push('/posts/new')}
          size="large"
        >
          Create New Post
        </Button>
        <Button
          variant="outlined"
          startIcon={<List />}
          onClick={() => router.push('/posts')}
          size="large"
        >
          View All Posts
        </Button>
      </Stack>
    </Box>
  );
};

