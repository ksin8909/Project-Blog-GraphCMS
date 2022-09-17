import Container from '../components/container'
import HomePosts from 'components/home-posts'
import Header from 'components/header'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Footer from 'components/footer'
import { getAllPostsForHome } from '../services'

export default function Index({ posts, preview }) {
  const morePosts = posts.slice(0, 10)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Blog with {CMS_NAME}</title>
        </Head>
        <Container>
          <Header />
          {morePosts.length > 0 && <HomePosts posts={morePosts} />}
          <Footer />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const posts = (await getAllPostsForHome(preview)) || []
  return {
    props: { posts, preview },
  }
}
