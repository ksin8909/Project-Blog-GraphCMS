import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import Container from 'components/container'
import Header from 'components/header'
import PostBody from 'components/post-body'
import MorePosts from 'components/more-posts'
import PostHeader from 'components/post-header'
import Layout from 'components/layout'
import Topics from 'components/topics'
import Footer from 'components/footer'
import PostTitle from 'components/post-title'
import CommentForm from 'components/comment-form'
import Comments from 'components/comments'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import { getPostsWithSlug, getPost, getMorePosts } from '../../services'

export default function Post({ post, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const [morePosts, setMorePosts] = useState([]);
  
  useEffect(() => {
    if (post) {
      getMorePosts(post.topic.slug, post.slug).then((result) => {
        setMorePosts(result);
      });
    } else {
    //  getRecentPosts().then((result) => {
    //    setRelatedPosts(result);
    //  });
    }
  }, [post]);

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | Blog with {CMS_NAME}
                </title>
              </Head>
              <section className="container mx-auto lg:px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-3 col-span-1 lg:order-1 order-last">
                    <div className="lg:sticky relative top-8 mb-8">
                      <Topics />
                    </div>
                  </div>
                  <div className="lg:col-span-9 col-span-1 order-2">
                    <div className="bg-white rounded-lg p-4 lg:p-8 mb-8">
                      <div className='flex'>
                        <Link href="/">
                          <span className={`cursor-pointer transition duration-500 hover:text-orange-600 block`}>Home</span>
                        </Link>
                        <span className='mx-2'> / </span>
                        <Link href={`/topic/${post.topic.slug}`}>
                          <span className={`cursor-pointer transition duration-500 hover:text-orange-600 block`}>{post.topic.title}</span>
                        </Link>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-0 lg:p-8 pb-12 mb-8">
                      <PostHeader
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        author={post.author}
                      />
                      <PostBody content={post.content} />
                    </div>
                    <div className="bg-white rounded-lg p-0 lg:p-8 pb-12 mb-8">
                      <CommentForm slug={post.slug} />
                    </div>
                    <Comments slug={post.slug} />
                    {morePosts.length > 0 && <MorePosts posts={morePosts} />}
                  </div>
                </div>
              </section>
            </article>
          </>
        )}
        <Footer />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  /*
  const data = await getPostAndMorePosts(params.slug, preview)
  return {
    props: {
      preview,
      post: data.post,
      morePosts: data.morePosts || [],
    },
  }*/

  const data = await getPost(params.slug)
  return {
    props: {
      post: data,
    },
  }

  /*
  const data2 = await getMorePosts(data.post.topic.slug, params.slug)
  return {
    props: {
      post: data,
      morePosts: data2,
    },
  }*/
}

export async function getStaticPaths() {
  
  const posts = await getPostsWithSlug();
  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };

  /*
  const posts = await getAllPostsWithSlug()
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  }*/
}
