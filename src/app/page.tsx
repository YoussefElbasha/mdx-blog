import { promises as fs } from 'fs'
import Link from 'next/link'

const Home = async () => {
  const blogs = await fs.readdir(process.cwd() + `/src/blogs`, 'utf8')

  console.log(blogs)
  console.log(fs.readFile(process.cwd() + `/src/blogs/test.md`))

  return (
    <div className='flex flex-col justify-start items-center'>
      {blogs.map((blog: string) => {
        return (
          <Link href={`/blog/${blog}`} key={blog}>
            {blog}
          </Link>
        )
      })}
    </div>
  )
}

export default Home
