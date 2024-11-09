const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen min-w-fit xl:px-56 lg:px-10 px-4 text-black lg:py-20 pb-10 pt-5'>
      {children}
    </div>
  )
}

export default Layout
