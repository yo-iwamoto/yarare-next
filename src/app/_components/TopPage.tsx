import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function WelcomePage() {
  return (
    <main className='mx-auto grid max-w-3xl gap-8 px-2 py-10'>
      <h1 className='text-center text-3xl font-bold'>Yarare App</h1>

      <div className='grid place-items-center'>
        <Link
          href='/sign-in'
          className={buttonVariants({ variant: 'default' })}
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
