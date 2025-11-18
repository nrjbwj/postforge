'use client';

import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';

interface ActivityItem {
  id: string;
  type: 'create' | 'edit' | 'comment';
  message: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'create',
    message: 'New post created: "Getting Started"',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'edit',
    message: 'Post edited: "API Documentation"',
    time: '5 hours ago',
  },
  {
    id: '3',
    type: 'comment',
    message: 'Comment added to "Welcome Post"',
    time: '1 day ago',
  },
];

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

export const RecentActivity: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
        Recent Activity
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Latest updates and changes
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

