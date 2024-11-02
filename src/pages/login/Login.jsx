import React, { useEffect } from 'react'
import SiteLogo from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation } from '../../context/api/userApi'
import { setToken, setUser } from '../../context/slices/authSlice'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let [loginUser, { data, isLoading, isSuccess, isError }] = useLoginUserMutation()
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data?.token))
            dispatch(setUser(data?.user))
            navigate('/admin')
            toast.success('Successfully logged in')
        }

    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error('Login or password is incorrect')
        }
    }, [isError])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let user = {
            login: data.get('username'),
            password: data.get('password'),
        }
        loginUser(user)

    };
    return (
        <main className='login-page'>
            <section className='login-section'>
                <div className="container">
                    <form onSubmit={handleSubmit} className="login-section__content">
                        <Link to={'/'}>
                            <img src={SiteLogo} alt="site logo" />
                        </Link>
                        <input style={{ borderColor: `${isError ? 'red' : '#454545'}` }} required name='username' type="text" placeholder='Username' />
                        <input style={{ borderColor: `${isError ? 'red' : '#454545'}` }} required name='password' type="password" placeholder='Password' />
                        <article>
                            <div></div>
                            <p>or</p>
                            <div></div>
                        </article>
                        <ul>
                            <li>Google</li>
                            <li>Email</li>
                        </ul>
                        <p>Don't have an account? <Link to={'/sign-up'}>Sign up</Link></p>
                        <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Login
