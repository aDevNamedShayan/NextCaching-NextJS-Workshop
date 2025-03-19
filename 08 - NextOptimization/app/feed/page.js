import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// export const metadata = {
//   title: 'All Posts',
//   description: 'Browse all our posts.',
// }

export async function generateMetadata(data) {
  const posts = await getPosts();
  const numOfPosts = posts.length
  return {
    title: `Browse ${numOfPosts} of our car posts!`,
    description: 'Browse our car posts!',
  }
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
