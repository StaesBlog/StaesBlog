import Link from 'next/link';

export default function Home() {
  const marquee = '<marquee class="mb-8">Welcome to the dark side of 1998</marquee>';

  return (
    <div className="min-h-screen bg-black text-green-400 p-8 font-mono">
      <center>
        <h1 className="text-4xl mb-4">StaesBlog</h1>
        <div dangerouslySetInnerHTML={{ __html: marquee }} />
        <p>
          <Link href="/posts" className="underline hover:text-green-300">
            Enter the blog
          </Link>
        </p>
      </center>
      <hr className="my-8 border-green-400" />
      <p className="text-sm">Best viewed with Netscape Navigator.</p>
    </div>
  );
}

