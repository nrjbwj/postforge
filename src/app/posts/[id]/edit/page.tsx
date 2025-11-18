'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@mui/material';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { BackButton } from '@/components/common/BackButton';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PostForm } from '@/components/forms/PostForm';
import { usePost, useUpdatePost } from '@/hooks/usePosts';
import Link from 'next/link';

export default function EditPostPage() {
  const params = useParams();
  const postId = useMemo(() => {
    const id = params?.id as string;
    return id ? parseInt(id, 10) : 0;
  }, [params?.id]);
  const { data: post, isLoading, error } = usePost(postId);
  const updatePostMutation = useUpdatePost();

  if (isLoading) {
    return (
      <PageLayout>
        <LoadingSpinner fullHeight />
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <PageHeader
          title="Post Not Found"
          subtitle={error ? 'Failed to load post. Please try again later.' : "The post you're looking for doesn't exist."}
        />
        <Link href="/posts" style={{ textDecoration: 'none' }}>
          <Button variant="contained">Back to Posts</Button>
        </Link>
      </PageLayout>
    );
  }

  const handleSubmit = async (data: { title: string; body: string }) => {
    return await updatePostMutation.mutateAsync({
      id: postId,
      title: data.title,
      body: data.body,
      userId: post.userId,
    });
  };

  return (
    <PageLayout>
      <BackButton href={`/posts/${postId}`} label="Back to Post" />
      <PageHeader
        title="Edit Post"
        subtitle="Update post details"
      />
      <PostForm
        mode="edit"
        initialData={post}
        onSubmit={handleSubmit}
        isLoading={updatePostMutation.isPending}
        cancelHref={`/posts/${postId}`}
      />
    </PageLayout>
  );
}
