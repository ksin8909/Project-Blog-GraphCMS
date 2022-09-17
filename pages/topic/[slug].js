import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from 'components/container'
import Header from 'components/header'
import TopicPosts from 'components/topic-posts'
import PostBody from 'components/post-body'
import MorePosts from 'components/more-posts'
import PostHeader from 'components/post-header'
import Layout from 'components/layout'
import Topics from 'components/topics'
import Footer from 'components/footer'
import PostTitle from 'components/post-title'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import { getTopics, getTopicPosts, getTopicFromSlug, getDifferentTopicPosts } from '../../services'

export default function Topic({ posts, topicTitle, differentTopicPosts, preview }) {
  const router = useRouter()
  const topicPosts = posts

  if (router.isFallback) {
    return <ErrorPage statusCode={404} />
  }

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
                  {topicTitle} | Blog with {CMS_NAME}
                </title>
              </Head>
              {topicPosts.length > 0 && <TopicPosts title={topicTitle} posts={topicPosts} differentTopicPosts={differentTopicPosts} />}
            </article>
          </>
        )}
        <Footer />
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const posts = await getTopicPosts(params.slug)
  const topicTitle = await getTopicFromSlug(params.slug)
  const differentTopicPosts = await getDifferentTopicPosts(params.slug)

  return {
    props: { posts, topicTitle, differentTopicPosts, preview },
  }

}

export async function getStaticPaths() {
  
  const topics = await getTopics();
  return {
    paths: topics.map(({ slug }) => ({ params: {slug } })),
    fallback: true,
  };
}
