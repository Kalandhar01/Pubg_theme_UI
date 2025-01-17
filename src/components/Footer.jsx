import React from 'react'
import { FaGit, FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa6'

const links = [

  {
    href:'https://github.com/kalandhar01' , icon:  <FaTwitter/>,
    href:'https://github.com/kalandhar01' , icon:  <FaInstagram/>,
    href:'https://github.com/kalandhar01' , icon:  <FaGit/>,
  }
]

const Footer = () => {
  return (

    <footer className='w-screen bg-black py-4 text-white'>

      <div className='container mx-auto flex flex-col items-center  justify-between gap-4 px-4 md:flex-row '>
        <p className='text-center text-sm md:text-left font-general'> &copy;Kalandhar 2025, All rights Reserved</p>

        <div className='flex justify-center gap-4 md:justify-center'>

          {
            links.map( (link)=>(
              <a 
              key={link} 
              target='_blank' 
              href={link.href} 
              className='text-white transition-colors duration-500 ease-in-out hover:text-yellow-300 '
              >{link.icon}</a>
            ))
          }

        </div>
      </div>

    </footer>




  )
}

export default Footer
