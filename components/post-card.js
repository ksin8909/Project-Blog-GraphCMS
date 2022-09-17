import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from '../components/avatar'
import CoverImage from './cover-image'

export default function PostCard({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className="bg-white rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative rounded-lg overflow-hidden mb-2">
        <CoverImage slug={slug} title={title} url={coverImage.url} />
      </div>
      <h1 className="text-left mb-8 cursor-pointer transition duration-500 hover:text-orange-600 text-3xl px-4 lg:px-0 font-semibold">
        <Link href={`/posts/${slug}`}>{title}</Link>
      </h1>
      <div className="mx-auto px-4 lg:px-0">
        <div className="flex items-center justify-end mb-8 w-full">
          <div className="flex items-center justify-center items-center mr-2">
            <Avatar name={author.name} picture={author.picture.url} />
          </div>
        </div>
      </div>
      <p className="text-left text-lg text-gray-700 font-normal px-4 lg:px-0 mb-8">
        {excerpt}
      </p>
      <div className="text-center">
        <Link href={`/posts/${slug}`}>
            <span className="transition duration-500 ease transform hover:bg-orange-600 inline-block bg-blue-600 text-lg font-medium outline outline-1 rounded-full text-white px-6 py-2 cursor-pointer">Read More<FontAwesomeIcon icon={faArrowRightLong} className="ml-2" /></span>
        </Link>
      </div>
    </div>
  )
}
