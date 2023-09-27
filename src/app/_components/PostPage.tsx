type Props = {
  post: {
    author: {
      userName: string;
    };
    body: string;
  };
};

export function PostPage({ post }: Props) {
  return (
    <main className='mx-auto grid max-w-3xl gap-8 px-2 py-10'>
      <h1 className='text-3xl font-bold'>Posts by {post.author.userName}</h1>

      <p>{post.body}</p>
    </main>
  );
}
