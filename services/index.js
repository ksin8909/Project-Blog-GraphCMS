import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getTopics = async () => {
    const query = gql`
      query GetTopics {
          topics (orderBy: title_ASC) {
            title
            slug
          }
      }
    `;

    const result = await request(graphqlAPI, query);
    return result.topics;
};

export const getTopicFromSlug = async (slug) => {
  const query = gql`
    query GetTopicFromSlug($slug: String!) {
        topic(where: {slug: $slug}) {
          title
        }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.topic.title;
};

export const getTopicPosts = async (slug) => {
  const query = gql`
    query GetTopicPosts($slug: String!) {
      topicPosts: posts(where: {topic: {slug_in: [$slug]}}, orderBy: date_DESC) {
        title
        slug
        excerpt
        date
        coverImage {
          url(transformation: {
            image: {
              resize: {
                fit:crop,
                width:2000,
                height:1000
              }
            }
          })
        }
        author {
          name
          picture {
            url(transformation: {
              image: {
                resize: {
                  width:100,
                  height:100,
                  fit:crop
                }
              }
            })
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.topicPosts;
};

export const getPostsWithSlug = async () => {
  const query = gql`
    query GetPosts {
      posts {
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};

export const getPost = async (slug) => {
  const query = gql`
    query GetPost($slug: String!) {
      post(where: {slug: $slug}) {
        title
        topic {
          title
          slug
        }
        slug
        content {
          html
        }
        date
        ogImage: coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
        coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
        author {
          name
          picture {
            url(transformation: {image: {resize: {fit: crop, width: 100, height: 100}}})
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const getMorePosts = async (topic, slug) => {
  const query = gql`
    query GetMorePosts($slug: String!, $topic: String!) {
      morePosts: posts(where: {slug_not_in: [$slug], AND: {topic: {slug_in: [$topic]}}}, orderBy: date_DESC, first: 3) {
        title
        slug
        date
        coverImage {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, topic });
  return result.morePosts;
};

export const getLatestPosts = async (topic) => {
  const query = gql`
    query GetLatestPosts {
      latestPosts: posts(orderBy: date_DESC, first: 5) {
        title
        slug
        date
        topic {
          title
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { topic });
  return result.latestPosts;
};

export const getDifferentTopicPosts = async (topic) => {
  const query = gql`
    query getDifferentTopicPosts($topic: String!) {
      differentTopicPosts: posts(where: {topic: {slug_not_in: [$topic]}}, orderBy: date_DESC, first: 5) {
        title
        slug
        date
        topic {
          title
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { topic });
  return result.differentTopicPosts;
};

export const getAllPostsForHome = async () => {
  const query = gql`
    query GetAllPostsForHome {
      homePosts: posts(orderBy: date_DESC, first: 20) {
        title
        slug
        excerpt
        date
        coverImage {
          url(transformation: {
            image: {
              resize: {
                fit:crop,
                width:2000,
                height:1000
              }
            }
          })
        }
        author {
          name
          picture {
            url(transformation: {
              image: {
                resize: {
                  width:100,
                  height:100,
                  fit:crop
                }
              }
            })
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.homePosts;

};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        content
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getPreviewPostBySlug = async (slug) => {
  const query = gql`
    query PostBySlug($slug: String!) {
      post(where: {slug: $slug}) {
        slug
      }
    }`;

    const result = await request(graphqlAPI, query, { slug });
    return result.post;

}