import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchPost, createPost, updatePost, deletePost, type Post, type CreatePostData, type UpdatePostData } from '@/lib/api/posts';
import { useActivity } from '@/contexts/ActivityContext';

// Query keys
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
};

// Fetch all posts
export function usePosts() {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: fetchPosts,
  });
}

// Fetch a single post
export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
}

// Create a new post
export function useCreatePost() {
  const queryClient = useQueryClient();
  const { addActivity } = useActivity();

  return useMutation({
    mutationFn: (data: CreatePostData) => createPost(data),
    onSuccess: (newPost) => {
      // Add the new post to the posts list cache directly
      queryClient.setQueryData<Post[]>(postKeys.lists(), (oldPosts) => {
        if (!oldPosts) return [newPost];
        return [newPost, ...oldPosts];
      });
      // Add the new post detail to cache
      queryClient.setQueryData(postKeys.detail(newPost.id), newPost);
      // Track activity
      addActivity({
        type: 'create',
        postId: newPost.id,
        postTitle: newPost.title,
      });
    },
  });
}

// Update an existing post
export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { addActivity } = useActivity();

  return useMutation({
    mutationFn: (data: UpdatePostData) => updatePost(data),
    onSuccess: (updatedPost) => {
      // Update the specific post in cache
      queryClient.setQueryData(postKeys.detail(updatedPost.id), updatedPost);
      
      // Update the post in the posts list cache directly
      queryClient.setQueryData<Post[]>(postKeys.lists(), (oldPosts) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      });
      // Track activity
      addActivity({
        type: 'edit',
        postId: updatedPost.id,
        postTitle: updatedPost.title,
      });
    },
  });
}

// Delete a post
export function useDeletePost() {
  const queryClient = useQueryClient();
  const { addActivity } = useActivity();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_, deletedId) => {
      // Get the post title before removing from cache
      const oldPosts = queryClient.getQueryData<Post[]>(postKeys.lists());
      const deletedPost = oldPosts?.find((post) => post.id === deletedId);
      
      // Remove the post from the posts list cache directly
      queryClient.setQueryData<Post[]>(postKeys.lists(), (oldPosts) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.filter((post) => post.id !== deletedId);
      });
      // Remove the post detail from cache
      queryClient.removeQueries({ queryKey: postKeys.detail(deletedId) });
      
      // Track activity
      if (deletedPost) {
        addActivity({
          type: 'delete',
          postId: deletedId,
          postTitle: deletedPost.title,
        });
      }
    },
  });
}

