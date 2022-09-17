import postStyles from './post-styles.module.css'

export default function PostBody({ content }) {
  return (
    <div
      className={`mx-auto px-4 lg:px-0 post ${postStyles.post}`}
      dangerouslySetInnerHTML={{ __html: content?.html }}
    />
  )
}
