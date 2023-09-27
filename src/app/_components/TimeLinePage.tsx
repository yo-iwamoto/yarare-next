import { PostForm } from './PostForm';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export async function TimeLinePage() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      body: true,
      author: {
        select: {
          userName: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <main className='mx-auto grid max-w-3xl gap-12 px-2 py-10'>
      <h1 className='text-3xl font-bold'>Timeline</h1>

      <PostForm />

      <hr />

      <ul className='grid gap-4'>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <article className='grid gap-2 rounded-md bg-white p-4 shadow-md transition-colors hover:bg-neutral-50 '>
                <p className='font-bold'>{post.author.userName}</p>
                <p>{post.body}</p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
