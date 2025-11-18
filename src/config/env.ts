export const env = {
  // Theme
  defaultTheme: (process.env.NEXT_PUBLIC_DEFAULT_THEME || 'light') as 'light' | 'dark',

  // API Configuration
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com',

  // Pagination
  postsPerPage: parseInt(process.env.NEXT_PUBLIC_POSTS_PER_PAGE || '10', 10),

  // Query Configuration
  queryStaleTime: parseInt(process.env.NEXT_PUBLIC_QUERY_STALE_TIME || '60000', 10), // milliseconds
  queryRetry: parseInt(process.env.NEXT_PUBLIC_QUERY_RETRY || '1', 10),

  // User Configuration
  defaultUserId: parseInt(process.env.NEXT_PUBLIC_DEFAULT_USER_ID || '1', 10),

  // Snackbar Configuration
  snackbarMaxSnack: parseInt(process.env.NEXT_PUBLIC_SNACKBAR_MAX_SNACK || '3', 10),
  snackbarAutoHideDuration: parseInt(process.env.NEXT_PUBLIC_SNACKBAR_AUTO_HIDE_DURATION || '3000', 10), // milliseconds
};

