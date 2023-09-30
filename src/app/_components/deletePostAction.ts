'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deletePostAction(formData: FormData) {
  const authorId = cookies().get('user_id')?.value;
  if (authorId === undefined) {
    return { success: false as const, message: 'You are not logged in' };
  }

  const data = Object.fromEntries(formData.entries());
  if (typeof data.postId !== 'string') {
    return { success: false as const, message: 'Invalid form data' };
  }

  const post = await prisma.post.findUnique({ where: { id: data.postId } });
  if (post === null) {
    return { success: false as const, message: 'Post not found' };
  }

  if (post.authorId !== authorId) {
    return { success: false as const, message: 'You are not the author' };
  }

  await prisma.post.delete({ where: { id: data.postId } });
  revalidatePath(`/posts/${data.postId}`);
  return { success: true as const };
}
