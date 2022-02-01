import type { NextPage } from 'next'
import { Footer, Header, Headline } from '../../general/general'


const Home: NextPage = (props) => {
  return (
  
    <div className="bg-gradient-to-r from-gray-200 to-gray-400  flex flex-col items-center justify-center min-h-screen py-2">
      <Header/>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Headline text="Tab creation" />
        <p className='mt-7 text-2xl text-red-700'>Coming soon...</p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            data-cy="linkToNew"
            href="/tab-creation/new"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Create new lyrics</h3>
          
          </a>

          <a
            href="/tab-creation/load"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Load lyrics</h3>
          </a>

          
        </div>

      </main>
      <Footer/>
    </div>
  )
}

export default Home
