import { authService } from "../../services/auth"
import { userService } from "../../services/auth"
import Modal from './Modal'
import { useState } from 'react'
import useLoginModal from '../../hooks/useLoginModal'
import { useNavigate } from 'react-router-dom'
import apiService from '../../services/apiService'
import { useAuth } from "../../services/AuthContext"
// import { handleLogin } from '@/app/lib/actions'

const LoginModal = () => {

    const { setUserId } = useAuth()
    const navigate = useNavigate()
    const loginModal = useLoginModal()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const submitLogin = async () => {
        setErrors([])

        const validationErrors: string[] = []

        if (!email || !password) {
            validationErrors.push('All fields are required.')
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors)
            return
        }


        const formData = {
            email: email,
            password: password
        }

        try {

            const response = await apiService.post(
                'auth/login/', 
                formData
            )

            if (response.access) {
                authService.setToken(response.access)
                await userService.set(response.user.pk)
                console.log(response)
                setUserId(response.user.pk)
                loginModal.close()
                navigate('/')

            } else {
            const tmpErrors: string[] = Object.values(response)
                .flat()
                .map((error: any) => error)
            setErrors(tmpErrors)
            }
        } catch (error) {

            setErrors(['Something went wrong. Please try again.'])
            console.error('Login error:', error)
        }
    }

    const content = (
        <>
        
        <form 
            className='space-y-4 h-fit overflow-auto'
            onSubmit={(e) => {
                e.preventDefault()
                submitLogin()
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
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                className='w-full h-[54px] border border-gray-300 px-4 rounded-xl' 
                placeholder='Enter Email'
            />

            <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                className='w-full h-[54px] border border-gray-300 px-4 rounded-xl' 
                placeholder='Enter Password'
            />
            
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
        isOpen={loginModal.isOpen}
        close={loginModal.close}
        label='Log in'
        content={content}
    />
  )
}

export default LoginModal