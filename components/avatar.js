import Image from 'next/image'

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-2">
        <Image
          src={picture}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      <div >{name}</div>
    </div>
  )
}
