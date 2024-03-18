import React from 'react'
import facebookicon from "../Images/facebookicon.webp"
import youtubeicon from "../Images/youtubeicon.webp"
import instaicon from "../Images/instaicon.webp"
import linkdin from "../Images/linkdinicon.webp"

const Footer = () => {
  return (
   

<footer class="bg-blue-900 dark:bg-gray-900">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                    <a href="#" class=" hover:underline text-white">About</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline text-white">Careers</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline text-white">Brand Center</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline text-white">Blog</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                    <a href="#" class="hover:underline text-white">Discord Server</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline text-white ">Twitter</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline text-white">Facebook</a>
                </li>
                <li class="mb-4">
                    <a href="#" class="hover:underline text-white">Contact Us</a>
                </li>
            </ul>
        </div>
        
        <div>
            <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Contact Information</h2>
            <ul class="text-gray-500 dark:text-gray-400 font-normal">
                <li class="mb-4">
                <div className='flex mt-6 justify-center items-center space-x-4'>
                
                <div>
                <img src={facebookicon} alt="Profile" className="h-8 w-8 " />
             
                    </div>
                    <div>
                    <p>Lionel Jayathilaka Mawatha, Kuliyapitiya, 
60200 Sri Lanka.</p>
                    
                    </div>
                   
                    


            </div>
                </li>
                <li class="mb-4">
                <div className='flex mt-6 justify-center items-center space-x-4'>
                
               
                    <div>
                <img src={instaicon} alt="Profile" className="h-8 w-8 " />
                    </div>

                    <div>
                    <p>+(94) 37 22 81412,
                         +(94) 37 22 81414</p>
                    
                    </div>
                   


            </div>
                </li>
                <li class="mb-2">
                <div className='flex mt-6 justify-center items-center space-x-4'>
                
                <div>
                <img src={facebookicon} alt="Profile" className="h-8 w-8 " />
                    </div>
                    
                    <div>
                    <p>info@wyb.ac.lk</p>
                    
                    </div>


            </div>
                </li>
                
            </ul>
             
        </div>
        <div>
            <div>
            <h4>Follow Us on :</h4>
            </div>
            <div className='flex mt-6 justify-center items-center space-x-4'>
                
                <div>
                <img src={facebookicon} alt="Profile" className="h-16 w-16 rounded-full" />
                    </div>
                    <div>
                <img src={youtubeicon} alt="Profile" className="h-16 w-16 rounded-full" />
                    </div>
                    <div>
                <img src={instaicon} alt="Profile" className="h-16 w-16 rounded-full" />
                    </div>
                    <div>
                <img src={linkdin} alt="Profile" className="h-16 w-16 rounded-full" />
                    </div>


            </div>

            </div>

    </div>
  
    </div>
</footer>

  )
}

export default Footer