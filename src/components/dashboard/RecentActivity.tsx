'use client';

import { useMemo } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import { useActivity, type Activity } from '@/contexts/ActivityContext';

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'create':
      // Blue for create
      return '#3b82f6';
    case 'edit':
      // Purple for edit
      return '#a855f7';
    case 'delete':
      // Red for delete
      return '#ef4444';
    default:
      return 'text.secondary';
  }
};

const getActivityMessage = (activity: Activity): string => {
  const truncatedTitle =
    activity.postTitle.length > 40
      ? activity.postTitle.substring(0, 40) + '...'
      : activity.postTitle;

  switch (activity.type) {
    case 'create':
      return `Post created: "${truncatedTitle}"`;
    case 'edit':
      return `Post edited: "${truncatedTitle}"`;
    case 'delete':
      return `Post deleted: "${truncatedTitle}"`;
    default:
      return '';
  }
};

// Format relative time from timestamp
const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  return new Date(timestamp).toLocaleDateString();
};

export const RecentActivity: React.FC = () => {
  const { activities } = useActivity();

  const recentActivities = useMemo(() => {
    // Get the 3 most recent activities
    return activities.slice(0, 3);
  }, [activities]);

  if (recentActivities.length === 0) {
    return (
      <Box>
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          Recent Activity
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Latest CRUD operations
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
        Latest CRUD operations
      </Typography>
      <List>
        {recentActivities.map((activity) => (
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
                primary={getActivityMessage(activity)}
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
              {formatRelativeTime(activity.timestamp)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

