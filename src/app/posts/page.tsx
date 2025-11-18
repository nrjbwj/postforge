'use client';

import { useState, useMemo } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { SearchInput } from '@/components/common/SearchInput';
import { Pagination } from '@/components/common/Pagination';
import { DataTable } from '@/components/data-display/DataTable';
import { usePosts, useDeletePost } from '@/hooks/usePosts';
import { Post } from '@/types/post';
import Link from 'next/link';
import { useSnackbar } from 'notistack';

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const { data: posts = [], isLoading, error } = usePosts();
  const deletePostMutation = useDeletePost();
  const { enqueueSnackbar } = useSnackbar();

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }

    const query = searchQuery.toLowerCase().trim();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.id.toString().includes(query)
    );
  }, [searchQuery, posts]);

  // Reset to page 1 when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        await deletePostMutation.mutateAsync(postToDelete.id);
        enqueueSnackbar('Post deleted successfully', { variant: 'success' });
        setDeleteDialogOpen(false);
        setPostToDelete(null);
      } catch {
        enqueueSnackbar('Failed to delete post', { variant: 'error' });
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };
  return (
    <PageLayout>
      <PageHeader
        title="Posts"
        subtitle="Manage and view all your posts"
      />
      <Box sx={{ mb: 3 }}>
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search posts by title, body, or ID..."
          maxWidth={500}
        />
      </Box>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorDisplay
          message="Failed to load posts. Please try again later."
          variant="text"
        />
      ) : (
        <DataTable<Post>
          columns={[
            {
              id: 'id',
              label: 'ID',
            },
            {
              id: 'title',
              label: 'Title',
              render: (post) => (
                <Typography variant="body2" fontWeight={500}>
                  {post.title}
                </Typography>
              ),
            },
            {
              id: 'body',
              label: 'Body',
              render: (post) => (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: 400,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.body}
                </Typography>
              ),
            },
            {
              id: 'actions',
              label: 'Actions',
              align: 'right',
              render: (post) => (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                    <IconButton size="small" color="primary" aria-label="view post">
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Link>
                  <Link href={`/posts/${post.id}/edit`} style={{ textDecoration: 'none' }}>
                    <IconButton size="small" color="primary" aria-label="edit post">
                      <Edit fontSize="small" />
                    </IconButton>
                  </Link>
                  <IconButton
                    size="small"
                    color="error"
                    aria-label="delete post"
                    onClick={() => handleDeleteClick(post)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ),
            },
          ]}
          data={paginatedPosts}
          emptyMessage={
            filteredPosts.length === 0
              ? 'No posts found matching your search.'
              : 'No posts on this page.'
          }
          getRowKey={(post) => post.id}
        />
      )}

      {/* Pagination */}
      {!isLoading && !error && filteredPosts.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={filteredPosts.length}
          itemsPerPage={POSTS_PER_PAGE}
          onPageChange={handlePageChange}
          showCount
          scrollToTop
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmColor="error"
        isLoading={deletePostMutation.isPending}
      />
    </PageLayout>
  );
}

