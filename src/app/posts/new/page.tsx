'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { BackButton } from '@/components/common/BackButton';
import { PostForm } from '@/components/forms/PostForm';
import { useCreatePost } from '@/hooks/usePosts';
import { env } from '@/config/env';

export default function NewPostPage() {
  const createPostMutation = useCreatePost();

  const handleSubmit = async (data: { title: string; body: string }) => {
    return await createPostMutation.mutateAsync({
      title: data.title,
      body: data.body,
      userId: env.defaultUserId,
    });
  };

  return (
    <PageLayout>
      <BackButton href="/posts" label="Back to Posts" />
      <PageHeader
        title="Create New Post"
        subtitle="Add a new post to your collection"
      />
      <PostForm
        mode="create"
        onSubmit={handleSubmit}
        isLoading={createPostMutation.isPending}
        cancelHref="/posts"
      />
    </PageLayout>
  );
}
