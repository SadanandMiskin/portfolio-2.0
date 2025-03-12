// import Contact from './Contact'
import Experience from './homepage/Experience'

import NameCard from './homepage/NameCard'
import Work from './homepage/Technologies'
// import Projects from './Projects'
// import Works from './homepage/Works'

const Homepage = () => {
  return (
    <section className='max-w-full  mt-4 flex flex-col items-center'>

      <NameCard />
      <Work />
      <Experience />
      {/* <Works /> */}

    </section>
  )
}

export default Homepage
