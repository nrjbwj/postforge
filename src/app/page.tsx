'use client';

import { useMemo } from 'react';
import { Box, Paper } from '@mui/material';
import { Description, People, TrendingUp } from '@mui/icons-material';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
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
    <PageLayout>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to PostForge - Manage your posts efficiently"
      />

      {/* Metrics Cards */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorDisplay
          message="Failed to load metrics. Please try again later."
          variant="text"
        />
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
          <RecentActivity />
        </Paper>
      </Box>
    </PageLayout>
  );
}
