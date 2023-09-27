'use client';

import { signInAction } from './signInAction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function SignInPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const formAction = (formData: FormData) => {
    startTransition(() => {
      (async () => {
        const result = await signInAction(formData);
        if (!result.success) {
          toast({
            title: result.message,
          });
          return;
        }

        router.push('/');
      })();
    });
  };

  return (
    <main className='mx-auto grid max-w-3xl gap-8 px-2 py-10'>
      <h1 className='text-3xl font-bold'>Sign in / Sign up</h1>
      <form action={formAction} className='grid gap-6'>
        <div className='grid gap-2'>
          <Label htmlFor='userName'>UserName</Label>
          <Input id='userName' type='text' name='userName' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' type='password' name='password' />
        </div>
        <Button type='submit' className='w-full' disabled={isPending}>
          Submit
        </Button>
      </form>
    </main>
  );
}
