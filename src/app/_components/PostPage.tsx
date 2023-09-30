'use client';

import { deletePostAction } from './deletePostAction';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  post: {
    id: string;
    author: {
      userName: string;
    };
    body: string;
  };
};

export function PostPage({ post }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const action = (formData: FormData) => {
    startTransition(() => {
      (async () => {
        const res = await deletePostAction(formData);
        if (!res.success) {
          toast({ title: res.message, variant: 'destructive' });
          return;
        }

        toast({ title: 'Post deleted' });
        router.push('/');
      })();
    });
  };

  return (
    <main className='mx-auto grid max-w-3xl gap-8 px-2 py-10'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Posts by {post.author.userName}</h1>

        <form action={action}>
          <input type='hidden' name='postId' value={post.id} />
          <Button variant='destructive' type='submit' disabled={isPending}>
            Delete
          </Button>
        </form>
      </div>

      <p>{post.body}</p>
    </main>
  );
}
