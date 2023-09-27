'use client';

import { postFormAction } from './postFormAction';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition } from 'react';
import type { KeyboardEvent } from 'react';

export function PostForm() {
  const [body, setBody] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const action = (formData: FormData) => {
    startTransition(() => {
      (async () => {
        const res = await postFormAction(formData);
        if (!res.success) {
          toast({ title: res.message });
          return;
        }

        setBody('');
        router.refresh();
      })();
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();

      const form = formRef.current;
      if (form === null) return;

      action(new FormData(form));
    }
  };

  return (
    <form action={action} className='grid gap-4' ref={formRef}>
      <h2 className='text-xl font-bold'>Post now</h2>
      <Textarea
        onKeyDown={onKeyDown}
        name='body'
        placeholder={"What's going on?"}
        disabled={isPending}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button type='submit' className='w-full font-bold' disabled={isPending}>
        Submit
      </Button>
    </form>
  );
}
