import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <div className="mx-auto">
        <CoverImage title={title} url={coverImage.url} />
      </div>
      <PostTitle>{title}</PostTitle>
      <div className="mx-auto px-4 lg:px-0">
        <div className="flex items-center justify-end mb-8 w-full">
          <div className="flex items-center justify-center items-center mr-4">
            <Avatar name={author.name} picture={author.picture.url} />
          </div>
          <div className="flex items-center justify-center font-medium text-gray-700">
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ fontSize: '2.2rem' }}
              className="text-gray-700 mr-2"
            />
            <Date dateString={date} />
          </div>
        </div>
      </div>
      
    </>
  )
}
