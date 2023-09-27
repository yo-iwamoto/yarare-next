import { SignOutButton } from './SignOutButton';
import { cookies } from 'next/headers';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
  const isAuthenticated = cookies().get('user_id') !== undefined;

  return (
    <>
      <header className='mx-auto flex h-20 max-w-3xl items-center justify-between px-2 py-5'>
        <Link href='/' className='text-2xl'>
          Yarare App
        </Link>

        {isAuthenticated && <SignOutButton />}
      </header>
      <div className='min-h-[calc(100vh_-_80px)] bg-neutral-100'>
        {children}
      </div>
    </>
  );
}
