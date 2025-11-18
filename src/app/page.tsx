'use client';

import { Container, Typography, Box, Paper } from '@mui/material';
import { Description, People, TrendingUp } from '@mui/icons-material';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Footer } from '@/components/layout/Footer';

export default function Dashboard() {
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
            value="100"
            subtitle="From API"
            icon={<Description sx={{ fontSize: 40 }} />}
          />
          <MetricCard
            title="Active Users"
            value="10"
            subtitle="Contributing authors"
            icon={<People sx={{ fontSize: 40 }} />}
          />
          <MetricCard
            title="Engagement"
            value="+12.5%"
            subtitle="vs last month"
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
          />
        </Box>

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
      </Container>
      <Footer />
    </Box>
  );
}
