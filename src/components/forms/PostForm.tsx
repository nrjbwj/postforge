"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { Post } from "@/types/post";

interface PostFormData {
  title: string;
  body: string;
}

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: Post;
  onSubmit: (data: PostFormData) => Promise<Post>;
  isLoading?: boolean;
  cancelHref: string;
}

export const PostForm: React.FC<PostFormProps> = ({
  mode,
  initialData,
  onSubmit,
  isLoading = false,
  cancelHref,
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  // Initialize state directly from props - initialData is always available on mount
  // (edit page shows loading state before rendering this component)
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [body, setBody] = useState(initialData?.body ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      enqueueSnackbar("Please fill in all fields", { variant: "error" });
      return;
    }

    try {
      const result = await onSubmit({
        title: title.trim(),
        body: body.trim(),
      });

      enqueueSnackbar(
        mode === "create"
          ? "Post created successfully!"
          : "Post updated successfully!",
        { variant: "success" }
      );
      router.push(`/posts/${result.id}`);
    } catch {
      enqueueSnackbar(
        mode === "create" ? "Failed to create post" : "Failed to update post",
        { variant: "error" }
      );
    }
  };

  const submitLabel = mode === "create" ? "Create Post" : "Update Post";
  const loadingLabel = mode === "create" ? "Creating..." : "Updating...";

  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              disabled={isLoading}
            />
            <TextField
              label="Body"
              fullWidth
              required
              multiline
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter post content..."
              disabled={isLoading}
            />
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Link href={cancelHref} style={{ textDecoration: "none" }}>
                <Button variant="outlined" disabled={isLoading}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? loadingLabel : submitLabel}
              </Button>
            </Box>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};
