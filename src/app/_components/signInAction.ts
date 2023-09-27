'use server';

import { prisma } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { cookies } from 'next/headers';

export async function signInAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  if (typeof data.userName !== 'string' || typeof data.password !== 'string') {
    return { success: false as const, message: 'Invalid form data' };
  }

  const { userName, password } = data;
  try {
    const user = await prisma.user.findUnique({ where: { userName } });
    if (user === null) {
      const newUser = await prisma.user.create({
        data: { userName, password },
        select: { id: true },
      });
      cookies().set('user_id', newUser.id);
      return { success: true as const, user: newUser };
    }

    if (user.password !== password) {
      return { success: false as const, message: 'Invalid password' };
    }

    cookies().set('user_id', user.id);
    return { success: true as const, user: { id: user.id } };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      return { success: false as const, message: 'UserName already exists' };
    }

    throw err;
  }
}
