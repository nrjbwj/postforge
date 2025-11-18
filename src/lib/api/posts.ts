import { env } from '@/config/env';

const API_BASE_URL = env.apiBaseUrl;

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Fetch all posts
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

// Fetch a single post by ID
export const fetchPost = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};

// Create a new post
export const createPost = async (data: CreatePostData): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

// Update an existing post
export const updatePost = async (data: UpdatePostData): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id: data.id,
      title: data.title,
      body: data.body,
      userId: data.userId,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  return response.json();
};

// Delete a post
export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
};

