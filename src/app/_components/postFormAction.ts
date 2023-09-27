'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function postFormAction(formData: FormData) {
  const authorId = cookies().get('user_id')?.value;
  if (authorId === undefined) {
    return { success: false as const, message: 'You are not logged in' };
  }

  const data = Object.fromEntries(formData.entries());
  if (typeof data.body !== 'string') {
    return { success: false as const, message: 'Invalid form data' };
  }

  const { body } = data;
  const post = await prisma.post.create({
    data: { body, authorId },
    select: {
      id: true,
      body: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          userName: true,
        },
      },
    },
  });
  return { success: true as const, post };
}
