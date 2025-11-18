'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from '@/types/post';
import { mockPosts as initialPosts } from '@/data/mockPosts';

interface PostsContextType {
  posts: Post[];
  createPost: (title: string, body: string, userId: number) => Post;
  updatePost: (id: number, title: string, body: string) => Post | null;
  deletePost: (id: number) => void;
  getPost: (id: number) => Post | undefined;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const createPost = (title: string, body: string, userId: number): Post => {
    const newId = Math.max(...posts.map((p) => p.id), 0) + 1;
    const newPost: Post = {
      id: newId,
      title,
      body,
      userId,
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id: number, title: string, body: string): Post | null => {
    const post = posts.find((p) => p.id === id);
    if (!post) return null;

    const updatedPost: Post = {
      ...post,
      title,
      body,
    };
    setPosts((prev) => prev.map((p) => (p.id === id ? updatedPost : p)));
    return updatedPost;
  };

  const deletePost = (id: number): void => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const getPost = (id: number): Post | undefined => {
    return posts.find((p) => p.id === id);
  };

  return (
    <PostsContext.Provider value={{ posts, createPost, updatePost, deletePost, getPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}

