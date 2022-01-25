import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import {FaGuitar} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'
// https://stackoverflow.com/questions/51785616/import-error-when-using-react-icons


const Home: NextPage = (props) => {
  return (
  
    <div className="bg-gradient-to-r from-gray-200 to-gray-400  flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Music Helper :)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-6xl font-bold flex">
          <div>Tab creation</div> 
        </div>
        <p className='mt-7 text-2xl text-red-700'>Coming soon...</p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
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
    

      <footer className="bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://github.com/artmarks/music-helper"
          target="_blank"
          rel="noopener noreferrer"
        >
        <div className='text-5xl'><FaGithub/></div>
        </a>
      </footer>
    </div>
  )
}

export default Home
