import clsx from 'clsx'
import Image from 'next/image'

import { GalleryLayout, Media } from '@/payload/payload-types'

interface PhotoProps {
  photos: GalleryLayout['photos']
}

export function Photos({ photos }: PhotoProps) {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {photos && photos.map(({photo, id}, index) => {
          const image = photo as Media;
          return (
          <div
            key={id}
            className={clsx(
              'relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[index % rotations.length],
            )}
          >
            <Image
              src={image.url!}
              alt={image.alt}
              width={image.width!}
              height={image.height!}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )
        })}
      </div>
    </div>
  )
}
