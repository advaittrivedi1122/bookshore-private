import { useEffect, useState } from 'react'
import { REGISTER_USER } from '../utils/Mutations';
import makeQuery from '../utils/AxiosQuery';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");   // default role is user
    const navigate = useNavigate();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            const data = await makeQuery(REGISTER_USER, {
                registerInput: {
                    name,
                    username,
                    password,
                    role
                }
            }, "Mutation")
            // Handle successful login, for example, save token to local storage
            if (data.registerUser) {
                localStorage.setItem('authToken', data.registerUser.authToken);
                localStorage.setItem('user', JSON.stringify(data.registerUser.user));
                navigate('/');
            }
            // Redirect or update UI as needed
        } catch (err) {
            console.error('Error logging in:', err);
        }
    }

    useEffect(() => {
        
    }, [username, password, role, name])

    return (
        <div>
            <Navbar isLogin={false} />
            <div className='absolute top-0 flex flex-col h-screen w-screen bg-slate-900 justify-center items-center text-emerald-500 font-bold text-xl'>
                <div className='border-2 mt-12 border-emerald-500 h-[32rem] w-[60vw] lg:w-[30vw] md:w-[80vw] rounded-lg'>
                    <div className='text-center mt-[2rem] text-2xl'>
                        Register
                    </div>

                    <div className='text-center mt-[2rem] text-md'>
                        {/* Name */}
                        <input type="text" placeholder='Name' className='p-3 rounded w-[40vw] lg:w-[25vw] md:w-[55vw]' onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className='text-center mt-[2rem] text-md'>
                        {/* Username */}
                        <input type="text" placeholder='Username' className='p-3 rounded w-[40vw] lg:w-[25vw] md:w-[55vw]' onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className='text-center mt-[2rem] text-md'>
                        {/* Password */}
                        <input type="password" placeholder='Password' className='p-3 rounded w-[40vw] lg:w-[25vw] md:w-[55vw]' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className='text-center mt-[2rem] text-md'>
                        {/* User Role */}
                        <select id='role' className='h-[2.3rem] w-[40vw] lg:w-[25vw] md:w-[55vw] rounded text-center' onChange={(e)=>{setRole(e.target.value)}}>
                            <option className='rounded' id='role' value="user" defaultChecked>User</option>
                            <option id='role' value="author">Author</option>
                        </select>
                    </div>
                    <div className='text-center mt-[1rem] text-md'>
                        {/* Submit */}
                        <button type="submit" className='bg-white mt-[1rem] h-[2.3rem] rounded lg:w-[25vw] w-[40vw] ' onClick={handleRegister}>Register</button>
                    </div>
                    <div className='text-center mt-[1.5rem] text-sm cursor-pointer' onClick={()=>{navigate('/login')}}>
                        {/* Password */}
                        Already have an account ? Login here.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register