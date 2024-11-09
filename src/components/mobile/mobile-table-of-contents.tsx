'use client'

import cn from 'classnames'
import { useEffect, useState } from 'react'
import ChevronDown from '@/icons/chevron-down.svg'
import { motion } from 'framer-motion'

type TableOfContentsProps = {
  headings: RegExpMatchArray | null
}

const MobileTableOfContents = ({ headings }: TableOfContentsProps) => {
  const toKebabCase = (str: string) => {
    if (!str) return ''

    return (
      str
        // Convert to lowercase
        .toLowerCase()
        // Replace any non-alphanumeric character with a space
        .replace(/[^a-z0-9\s]/g, '')
        // Replace multiple spaces with a single space
        .replace(/\s+/g, ' ')
        // // Trim spaces from start and end
        .trim()
        // // Replace spaces with hyphens
        .replace(/\s/g, '-')
    )
  }

  const [currentHeading, setCurrentHeading] = useState<string | null>(null)

  useEffect(() => {
    if (!headings) return

    const elements = document.querySelectorAll('.classyclass h2')

    let previousScrollPosition = 0

    const isScrollingDown = () => {
      let goingDown = false

      const scrollPosition = window.scrollY

      if (scrollPosition > previousScrollPosition) {
        goingDown = true
      }

      previousScrollPosition = scrollPosition

      return goingDown
    }

    const handleScroll = () => {
      for (const [index, element] of elements.entries()) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          return setCurrentHeading(elements[elements.length - 1].textContent)
        }

        if (
          !isScrollingDown() &&
          currentHeading === element.textContent &&
          element.getBoundingClientRect().top >
            window.innerHeight - window.innerHeight * 0.6
        ) {
          return setCurrentHeading(elements[index - 1]?.textContent ?? null)
        }

        if (
          element.getBoundingClientRect().top > 0 &&
          element.getBoundingClientRect().top <
            window.innerHeight - window.innerHeight * 0.6
        ) {
          return setCurrentHeading(element.textContent)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentHeading, headings])

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn('sticky top-5  block lg:hidden z-[1] mb-4 bg-black', {
        'rounded-full': !isExpanded,
        'rounded-3xl': isExpanded,
      })}
    >
      <div className='flex flex-row justify-between items-start w-full max-w-[calc(100%-2.75rem)] px-6 py-3 min-h-[3.25rem]'>
        <p className='text-white text-lg font-medium  overflow-hidden text-ellipsis whitespace-nowrap'>
          {currentHeading}
        </p>

        <div
          className='bg-white rounded-full aspect-square absolute right-1 top-1 min-h-11 min-w-11'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            className={cn(
              'absolute min-w-5 w-5 max-w-4 min-h-4 h-4 top-1/2  -translate-y-1/2 right-1/2 translate-x-1/2',
              {
                'rotate-180': isExpanded,
                'rotate-0': !isExpanded,
              }
            )}
          />
        </div>
      </div>

      {isExpanded && (
        <div className='flex flex-col w-full'>
          <div className='h-px bg-white/20'></div>
          <div className='flex flex-col gap-3 justify-center items-start px-6 py-4'>
            {headings?.map((heading, index) => (
              <a
                key={index}
                href={`#${toKebabCase(heading)}`}
                className={cn(` text-lg font-normal`, {
                  'text-white': currentHeading !== heading.substring(3),
                  'text-[#0DA570]': currentHeading === heading.substring(3),
                })}
              >
                {heading.substring(3)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileTableOfContents
