import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTopics } from '../services'

export default function Pages() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((newTopics) => {
      setTopics(newTopics);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 lg:p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Topics</h3>
      {topics.map((topic, index) => (
        <Link key={index} href={`/topic/${topic.slug}`}>
          <span className={`cursor-pointer transition duration-500 hover:text-orange-600 block ${(index === topics.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{topic.title}</span>
        </Link>
      ))}
    </div>
  )
}
