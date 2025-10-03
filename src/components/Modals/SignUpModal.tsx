import { useAuth } from '../../services/AuthContext' 
import Modal from './Modal' 
import { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 
import useSignUpModal from '../../hooks/useSignUpModal' 
import apiService from '../../services/apiService' 
import { authService, userService } from '../../services/auth' 
import { FaEye, FaEyeSlash } from "react-icons/fa" 


const SignUpModal = () => { const { setUserId } = useAuth() 
   
    const navigate = useNavigate() 
    const SignUpModal = useSignUpModal() 
    const [email, setEmail] = useState('') 
    const [username, setUsername] = useState('') 
    const [password1, setPassword1] = useState('') 
    const [password2, setPassword2] = useState('') 
    const [errors, setErrors] = useState<string[]>([]) 
    
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const togglePasswordVisibility2 = () => {
        setShowPassword2((prev) => !prev)
    }

    const submitSignUp = async () => { setErrors([])

        const validationErrors: string[] = []; 

        if (!username || !email || !password1 || !password2) { 
            validationErrors.push('All fields are required.'); 
        } 

        if (password1 !== password2) { 
            validationErrors.push('Passwords do not match.'); 
        } 
        
        if (validationErrors.length > 0) { 
            setErrors(validationErrors); return; 
        } 
        
        const formData = { username, email, password1, password2 }; 
        
        try { 
            const response = await apiService.post(
                'auth/register/', 
                formData
            ); 
            if (response.status === 500) { 
                setErrors(['User with this email already exists.']); 
            } 
            
            if (response.access) { 
                authService.setToken(response.access); 
                await userService.set(response.user.pk); 
                setUserId(response.user.pk); 
                SignUpModal.close(); 
                navigate('/'); 
            } else { 
                const tmpErrors: string[] = Object.values(response) 
                .flat() 
                .map((error: any) => error); setErrors(tmpErrors); } 
            
        } catch (error) { 
            setErrors(['User with this email already exists.']); 
            console.error('Sign-up error:', error); 
        } 
    }; 
    
    const content = ( 
        <> 
            <form 
                className='space-y-4 h-[90%] overflow-auto' 
                onSubmit={(e) => { 
                    e.preventDefault() 
                    submitSignUp() 
                }} 
            > 
            { 
                errors.map((error, index) => { 
                    return ( 
                        <ul 
                            className="px-5 text-airbnb-dark rounded-xl opacity-80" 
                            key={`error_${index}`} 
                        > 
                            <li>{ error }</li>
                        </ul> 
                    ) 
                }) 
            } 
            
            <input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                type="text" 
                className='w-full h-[54px] border border-gray-300 px-4 rounded-xl' 
                placeholder='Enter Username' 
            /> 

            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                className='w-full h-[54px] border border-gray-300 px-4 rounded-xl' 
                placeholder='Enter Email' 
            /> 
            
            <div className="relative w-full  border border-gray-300 rounded-xl">
                <input 
                    value={password1} 
                    onChange={(e) => setPassword1(e.target.value)}
                    type={showPassword ? 'text' : 'password'} 
                    className='h-[54px] px-4 focus:outline-0' 
                    placeholder='Enter Password' 
                /> 

                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-4.5 text-gray"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            <div className="relative w-full  border border-gray-300 rounded-xl">
                <input 
                    value={password1} 
                    onChange={(e) => setPassword2(e.target.value)}
                    type={showPassword2 ? 'text' : 'password'} 
                    className='h-[54px] px-4 focus:outline-0' 
                    placeholder='Enter Password' 
                /> 

                <button
                    type="button"
                    onClick={togglePasswordVisibility2}
                    className="absolute right-2 top-4.5 text-gray"
                >
                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            
            <button 
                className='cursor-pointer py-4 px-6 text-center bg-airbnb transition text-white rounded-xl hover:bg-airbnb-dark' 
                type='submit' 
            > 
                Submit 
            </button> 
            
            </form> 
        </> 
    ) 
    return (
        <Modal 
            isOpen={SignUpModal.isOpen} 
            close={SignUpModal.close} 
            label='Sign Up' 
            content={content} 
        /> 
    )
} 

export default SignUpModal;