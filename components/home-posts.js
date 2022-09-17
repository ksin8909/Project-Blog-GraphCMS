import PostCard from '../components/post-card'
import Topics from '../components/topics'
import LatestPosts from '../components/post-latest'

export default function HomePosts({ posts }) {
  return (
    <section className="container mx-auto lg:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 col-span-1 lg:order-1 order-last">
          <div className="lg:sticky relative top-8">
            <Topics />
          </div>
        </div>
        <div className="lg:col-span-6 col-span-1 order-2">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </div>
        <div className="lg:col-span-3 col-span-1 order-3">
          <div className="lg:sticky relative top-8">
            <LatestPosts />
          </div>
        </div>
      </div>
    </section>
  )
}
