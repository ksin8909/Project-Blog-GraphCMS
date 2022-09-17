import PostPreview from '../components/post-preview'

export default function MorePosts({ posts }) {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 mb-4 gap-8">
      <div className="lg:col-span-12 col-span-1">
        <h3 className="text-xl mb-8 font-semibold border-b text-center pb-4">More Posts</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {posts.map((post) => (
          <PostPreview
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
    </div>
  )
}
