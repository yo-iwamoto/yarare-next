import { TimeLinePage } from './_components/TimeLinePage';
import { WelcomePage } from './_components/TopPage';
import { cookies } from 'next/headers';

export default function Page() {
  const isAuthenticated = cookies().get('user_id') !== undefined;

  if (!isAuthenticated) {
    return <WelcomePage />;
  }

  return <TimeLinePage />;
}
