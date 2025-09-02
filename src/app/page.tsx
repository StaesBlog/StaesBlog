import { getPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div
      style={{
        backgroundColor: '#000',
        color: '#0f0',
        fontFamily: 'Courier New, monospace',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>StaesBlog</h1>
        <p>Welcome to the retro zone.</p>
        <hr />
      </div>
      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>No posts yet</p>
        </div>
      ) : (
        <table width="100%" style={{ marginTop: '40px' }}>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug}>
                <td>
                  <a href={`/posts/${post.slug}`} style={{ color: '#ff0' }}>
                    {post.title}
                  </a>
                </td>
                <td align="right">
                  <span style={{ color: '#888' }}>{post.publishedAt.toDateString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
