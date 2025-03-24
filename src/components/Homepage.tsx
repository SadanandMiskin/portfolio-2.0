// import Contact from './Contact'
import BlogList from './blogs/BlogList'
import Experience from './homepage/Experience'

import NameCard from './homepage/NameCard'
import Work from './homepage/Technologies'
import Works from './homepage/Works'
// import Projects from './Projects'
// import Projects from './Projects'
// import Works from './homepage/Works'

const Homepage = () => {
  return (
    <section className='max-w-full  mt-4 flex flex-col items-center'>

      <NameCard />
      <Work />
      <Experience />
      <Works  />
      <BlogList />
    </section>
  )
}

export default Homepage
