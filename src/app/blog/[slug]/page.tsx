import MobileTableOfContents from '@/components/mobile/mobile-table-of-contents'
import TableOfContents from '@/components/table-of-contents'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import rehypeSlug from 'rehype-slug'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

  const url =
    process.env.NODE_ENV === 'development'
      ? `/src/app/blogs/${slug}`
      : `/src/app/blogs/${slug}`

  console.log(process.cwd() + url)

  const file = await fs.readFile(process.cwd() + url, 'utf8')

  const matterResult = matter(file)

  const h2Pattern = /^##\s?.+$/gm

  const headings = matterResult.content.match(h2Pattern)

  return (
    <div className='flex flex-col justify-center items-center '>
      <MobileTableOfContents headings={headings} />
      {matterResult.data.title && (
        <h1 className='text-4xl text-center font-semibold lg:mb-11 mb-8'>
          {matterResult.data.title}
        </h1>
      )}
      {matterResult.data.coverImage && (
        <Image
          src={matterResult.data.coverImage}
          className='rounded-[2.25rem] h-[694px] w-[1068px] lg:mb-14 mb-8'
          alt={matterResult.data.coverImage}
          width={1068}
          height={694}
        />
      )}
      <div className='flex flex-row justify-between items-start relative lg:gap-8'>
        <div className='relative classyclass lg:max-w-[42rem]'>
          <MDXRemote
            source={matterResult.content}
            options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
          />
        </div>
        <TableOfContents headings={headings} />
      </div>
    </div>
  )
}

export default Page
