'use client';

import { useMemo } from 'react';
import { Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { Description, People, TrendingUp } from '@mui/icons-material';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Footer } from '@/components/layout/Footer';
import { usePosts } from '@/hooks/usePosts';

export default function Dashboard() {
  const { data: posts = [], isLoading, error } = usePosts();

  // Calculate metrics from API data
  const metrics = useMemo(() => {
    const totalPosts = posts.length;
    const uniqueUsers = new Set(posts.map((post) => post.userId)).size;
    
    // Calculate average posts per user for engagement metric
    const avgPostsPerUser = uniqueUsers > 0 ? (totalPosts / uniqueUsers).toFixed(1) : '0';
    
    return {
      totalPosts,
      uniqueUsers,
      avgPostsPerUser,
    };
  }, [posts]);

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
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to PostForge - Manage your posts efficiently
          </Typography>
        </Box>

        {/* Metrics Cards */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, mb: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ py: 4, mb: 4 }}>
            <Typography variant="body1" color="error">
              Failed to load metrics. Please try again later.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(3, 1fr)',
              },
              gap: 3,
              mb: 4,
            }}
          >
            <MetricCard
              title="Total Posts"
              value={metrics.totalPosts}
              subtitle="From API"
              icon={<Description sx={{ fontSize: 40 }} />}
            />
            <MetricCard
              title="Active Users"
              value={metrics.uniqueUsers}
              subtitle="Contributing authors"
              icon={<People sx={{ fontSize: 40 }} />}
            />
            <MetricCard
              title="Avg Posts/User"
              value={metrics.avgPostsPerUser}
              subtitle="Average per user"
              icon={<TrendingUp sx={{ fontSize: 40 }} />}
            />
          </Box>
        )}

        {/* Quick Actions and Recent Activity */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          <Paper sx={{ p: 3 }}>
            <QuickActions />
          </Paper>
          <Paper sx={{ p: 3 }}>
            <RecentActivity posts={posts} isLoading={isLoading} />
          </Paper>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
