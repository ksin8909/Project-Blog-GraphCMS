import { useState, useEffect } from 'react'
import Link from 'next/link'
import Date from '../components/date'

export default function PostDifferentTopic({ differentTopicPosts }) {

  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Posts form Different Topics</h3>
      {differentTopicPosts.map((post, index) => (
        <div className="posts-latest" key={index}>
          <Date dateString={post.date} />
          <Link href={`/posts/${post.slug}`}>
            <span className={`cursor-pointer transition duration-500 hover:text-orange-600 block ${(index === post.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>【{post.topic.title}】{post.title}</span>
          </Link>
        </div>
        
      ))}
    </div>
  )
}
