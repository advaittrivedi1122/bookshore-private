import React, { useEffect, useState } from 'react'

const Navbar = ({ isLoggedIn, setIsLoggedIn }: any) => {
  const [show, setShow] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShow(false)
    setAuthToken("");
    localStorage.clear();
  }
  
  useEffect(() => {
    const token: string | null = localStorage.getItem('authToken');
    if(token && !authToken) {
      setAuthToken(token);
      setIsLoggedIn(true);
    } 
  }, [show, isLoggedIn])

  return (
    <div className='flex flex-row flex-wrap items-center justify-between bg-blue-500 h-[4rem] w-full relative z-10'>
      <div className='text-white text-2xl font-mono font-semibold pl-10 cursor-pointer'>BookShore</div>

    {isLoggedIn && (
      <div className='text-white font-mono font-semibold h-[2rem] w-[5rem] pr-[2.5rem] cursor-pointer' onClick={() => setShow(!show)}>
        <svg height={'auto'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round" />
          <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
          <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
    )}
      {show && (
        <div className='h-auto w-[150px] bg-white absolute top-[4.1rem] right-[2.5rem] rounded z-9'>
          <div className='hover:text-blue-500 text-slate-400 text-lg text-center font-mono font-semibold p-2 cursor-pointer'>View PDFs</div>
          <div className='hover:text-blue-500 text-slate-400 text-lg text-center font-mono font-semibold p-2 cursor-pointer'>Upload PDF</div>
          <div className='hover:text-blue-500 text-slate-400 text-lg text-center font-mono font-semibold p-2 cursor-pointer'>Favourites</div>
          <div className='hover:text-blue-500 text-slate-400 text-lg text-center font-mono font-semibold p-2 cursor-pointer' onClick={handleLogout}>Logout</div>
        </div>
      )}


    </div>
  )
}

export default Navbar