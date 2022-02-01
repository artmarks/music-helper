import type { NextPage } from 'next'
import {FaGuitar} from 'react-icons/fa'
import { Footer, Header } from '../../general/general'

const Home: NextPage = (props) => {
  return (
  
    <div className="bg-gradient-to-r from-gray-200 to-gray-400  flex flex-col items-center justify-center min-h-screen py-2">
      <Header/>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-6xl font-bold flex">
          <div>Learn  guitar chords</div><div className='ml-3'><FaGuitar/></div> 
        </div>
        <p className='mt-7 text-2xl text-red-700'>Coming soon...</p>

      </main>
    
      <Footer/>
    </div>
  )
}

export default Home
