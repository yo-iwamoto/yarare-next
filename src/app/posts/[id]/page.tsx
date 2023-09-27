import { PostPage } from '@/app/_components/PostPage';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      body: true,
      author: {
        select: {
          id: true,
          userName: true,
        },
      },
    },
  });
  if (post === null) notFound();

  return <PostPage post={post} />;
}
