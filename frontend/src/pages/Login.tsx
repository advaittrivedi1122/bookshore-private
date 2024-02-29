import React, { useEffect, useState } from 'react'
import { LOGIN_USER } from '../utils/Mutations';
import makeQuery from '../utils/AxiosQuery';
import Navbar from '../components/Navbar';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const data = await makeQuery(LOGIN_USER, {
                loginInput: {
                    username,
                    password
                }
            }, "Mutation")
            console.log("🚀 ~ handleLogin ~ data:", data)
            // Handle successful login, for example, save token to local storage
            if(data.loginUser) {
                localStorage.setItem('authToken', data.loginUser.authToken);
                localStorage.setItem('user', JSON.stringify(data.loginUser.user));
            }
            // Redirect or update UI as needed
          } catch (err) {
            console.error('Error logging in:', err);
          }
    }

    useEffect(()=>{
        console.log("username", username)
        console.log('password', password)
    }, [username, password])

    return (
        <div>
            <Navbar></Navbar>
        <div className='absolute top-0 flex flex-col h-screen w-screen bg-slate-900 justify-center items-center text-emerald-500 font-bold text-xl'>
            <div className='border-2 mt-8 border-emerald-500 h-[25rem] w-[60vw] lg:w-[30vw] md:w-[80vw] rounded-lg'>
                <div className='text-center mt-[2rem] text-2xl'>
                Login
                </div>
                
                <div className='text-center mt-[2rem] text-md'>
                {/* Username */}
                    <input type="text" placeholder='Username' className='p-3 rounded w-[40vw] lg:w-[25vw] md:w-[55vw]' onChange={(e)=>{setUsername(e.target.value)}} />
                </div>
                <div className='text-center mt-[2rem] text-md'>
                {/* Password */}
                    <input type="password" placeholder='Password' className='p-3 rounded w-[40vw] lg:w-[25vw] md:w-[55vw]' onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <div className='text-center mt-[2rem] text-md'>
                {/* Submit */}
                    <button type="submit" className='bg-white mt-[1rem] h-[2.3rem] rounded lg:w-[25vw] w-[40vw] ' onClick={handleLogin}>Login</button>
                </div>
                <div className='text-center mt-[2rem] text-sm'>
                {/* Password */}
                    Don't have an account ? Register here.
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login