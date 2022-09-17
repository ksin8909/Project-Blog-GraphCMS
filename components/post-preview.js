import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className="adjacent-post rounded-lg relative h-72">
      <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover inline-block w-full h-72" style={{ backgroundImage: `url('${coverImage.url}')` }} />
        <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-60 from-gray-400 via-gray-600 to-black w-full h-72" />
        <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
          <p className="font-semibold text-xs">{date}</p>
          <p className="text-white font-semibold text-2xl text-center">{title}</p>
        </div>
        <Link href={`/posts/${slug}`}><span className="z-10 cursor-pointer absolute w-full h-full" /></Link>
      </div>
  )
}
