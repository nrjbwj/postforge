'use client';

import { Box } from '@mui/material';
import { Person } from '@mui/icons-material';

interface UserAvatarProps {
  userId: number;
  name?: string;
  size?: number;
}

// Generate a consistent color for a user ID
const getUserColor = (userId: number): string => {
  // Use a simple hash function to generate consistent colors
  const hash = userId * 137; // Prime number for better distribution
  const hue = hash % 360;
  const saturation = 60 + (hash % 20); // 60-80% saturation
  const lightness = 50 + (hash % 15); // 50-65% lightness
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userId,
  name,
  size = 20,
}) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
      }}
      title={name || `User ${userId}`}
    >
      <Person sx={{ fontSize: size, color: getUserColor(userId) }} />
    </Box>
  );
};

