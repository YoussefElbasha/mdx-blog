'use client'

import cn from 'classnames'
import { useEffect, useState } from 'react'

type TableOfContentsProps = {
  headings: RegExpMatchArray | null
}

const TableOfContents = ({ headings }: TableOfContentsProps) => {
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

  return (
    <div className='sticky top-10 hidden lg:block'>
      <div className=' flex-1 flex flex-col justify-center items-start gap-4'>
        <p className='font-semibold text-base font-inter '>Table of Content</p>
        <div className=' flex flex-col justify-center items-start gap-2'>
          {headings?.map((heading, index) => (
            <a
              key={index}
              href={`#${toKebabCase(heading)}`}
              className={cn(`text-base font-inter`, {
                'text-black': currentHeading !== heading.substring(3),
                'text-[#0DA570]': currentHeading === heading.substring(3),
              })}
              onClick={() => console.log(heading, currentHeading)}
            >
              {heading.substring(3)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableOfContents
