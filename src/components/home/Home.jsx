import React, { useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';


function Home() {
  const [text] = useTypewriter({
    words: ['Managed !', 'Recorded !','Resolved !','Notified !'],
    loop: 0,
    typeSpeed: 120,
    deleteSpeed: 80,
  });
const navigate=useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/loginsignup');
    }
  }, [navigate]);

  return (
    <>
      <div className="bg-orange-100 h-screen">
        <div className="flex flex-col md:flex-row h-[80vh] w-full">
          <div className="flex flex-1 space-y-5 items-center justify-center  md:p-0">
            <div className="text-center mt-5 md:text-left md:ml-20">
              <h1 className="font-bold text-2xl md:text-4xl mb-5 text-blue-900 font-myFont1">
               Merchant Interactions and Tasks :<br />
                <span className="font-bold text-4xl md:text-5xl mb-5 text-orange-800">{text}</span>
                <Cursor />
              </h1>
            <NavLink to='/agent-dashboard'>
                <button
                  type="button"
                  className="bg-blue-900 p-3 md:p-4 rounded-3xl text-white font-bold text-lg md:text-xl "
                >
                  My Dashboard →
                </button>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center  p-4 md:p-0">
              <img src="/home-2.png" className="object-cover w-full h-auto  md:mr-10 md:mt-10"  alt="" />
          </div>
        </div>

      </div>
    </>
  );
}

export default Home;

