'use client';

import { useMemo } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import { Post } from '@/types/post';

interface ActivityItem {
  id: string;
  type: 'create' | 'edit' | 'comment';
  message: string;
  time: string;
}

interface RecentActivityProps {
  posts: Post[];
  isLoading?: boolean;
}

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'create':
      // Blue for create
      return '#3b82f6';
    case 'edit':
      // Purple for edit
      return '#a855f7';
    case 'comment':
      // Green for comment
      return '#10b981';
    default:
      return 'text.secondary';
  }
};

// Format relative time based on post ID (since JSONPlaceholder doesn't have timestamps)
const formatRelativeTime = (postId: number, totalPosts: number): string => {
  // Higher IDs are more recent, so we calculate relative position
  const position = totalPosts - postId;
  if (position < 5) return 'Just now';
  if (position < 10) return 'Recently';
  if (position < 20) return 'A while ago';
  return `Post #${postId}`;
};

export const RecentActivity: React.FC<RecentActivityProps> = ({ posts, isLoading = false }) => {
  const activities = useMemo(() => {
    if (!posts || posts.length === 0) return [];

    // Get the 3 most recent posts (highest IDs)
    const recentPosts = [...posts]
      .sort((a, b) => b.id - a.id)
      .slice(0, 3);

    return recentPosts.map((post) => ({
      id: post.id.toString(),
      type: 'create' as const,
      message: `Post created: "${post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}"`,
      time: formatRelativeTime(post.id, posts.length),
    }));
  }, [posts]);

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Latest updates and changes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Loading activities...
        </Typography>
      </Box>
    );
  }

  if (activities.length === 0) {
    return (
      <Box>
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Latest updates and changes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No recent activity
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
        Recent Activity
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Latest posts from API
      </Typography>
      <List>
        {activities.map((activity) => (
          <ListItem
            key={activity.id}
            sx={{
              px: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <FiberManualRecord
                  sx={{
                    fontSize: 12,
                    color: getActivityColor(activity.type),
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={activity.message}
                primaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.primary',
                }}
              />
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 2, whiteSpace: 'nowrap' }}
            >
              {activity.time}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

