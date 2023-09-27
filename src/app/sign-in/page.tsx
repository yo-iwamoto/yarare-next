import { SignInPage } from '../_components/SignInPage';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Page() {
  const isAuthenticated = cookies().get('user_id') !== undefined;

  if (isAuthenticated) {
    redirect('/');
  }

  return <SignInPage />;
}
