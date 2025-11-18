import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchPost, createPost, updatePost, deletePost, type Post, type CreatePostData, type UpdatePostData } from '@/lib/api/posts';

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

  return useMutation({
    mutationFn: (data: CreatePostData) => createPost(data),
    onSuccess: (newPost) => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      // Optionally add the new post to the cache
      queryClient.setQueryData(postKeys.detail(newPost.id), newPost);
    },
  });
}

// Update an existing post
export function useUpdatePost() {
  const queryClient = useQueryClient();

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
    },
  });
}

// Delete a post
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_, deletedId) => {
      // Remove the post from cache
      queryClient.removeQueries({ queryKey: postKeys.detail(deletedId) });
      // Invalidate posts list to refetch
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

