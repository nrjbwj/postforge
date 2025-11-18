'use client';

import { Container, Typography, Box } from '@mui/material';
import { Footer } from '@/components/layout/Footer';

export default function EditPostPage({ params }: { params: { id: string } }) {
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
            Edit Post
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Edit post ID: {params.id}
          </Typography>
        </Box>

        {/* Edit post form will go here */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            Edit post form coming soon...
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

