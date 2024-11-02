import React, { useEffect } from 'react'
import SiteLogo from '../../assets/icons/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRegisterUserMutation } from '../../context/api/userApi'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let [signUp, { isLoading, isSuccess, isError }] = useRegisterUserMutation()
    useEffect(() => {
        if (isSuccess) {
            navigate('/register')
            toast.success('Successfully account created. Now login')
        }

    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error('Please try again')
        }
    }, [isError])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let user = {
            login: data.get('username'),
            password: data.get('password'),
            name: data.get('name'),
            lname: data.get('lname'),
            phone: data.get('phone'),
            email: data.get('email'),
            avatar: data.get('avatar'),
        }
        signUp(user)

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
                        <input style={{ borderColor: `${isError ? 'red' : '#454545'}` }} required name='name' type="text" placeholder='First name' />
                        <input style={{ borderColor: `${isError ? 'red' : '#454545'}` }} required name='lname' type="text" placeholder='Last name' />
                        <input style={{ borderColor: `${isError ? 'red' : '#454545'}` }} required name='phone' type="tel" placeholder='+(998) 94-291-86-46' />
                        <input style={{ borderColor: `${isError ? 'red' : '#454545'}` }} required name='email' type="email" placeholder='Email' />
                        <input style={{ borderColor: `${isError ? 'red' : '#454545'}` }} required name='avatar' type="text" placeholder='Avatar link' />
                        <article>
                            <div></div>
                            <p>or</p>
                            <div></div>
                        </article>
                        <ul>
                            <li>Google</li>
                            <li>Email</li>
                        </ul>
                        <p>Already have an account? <Link to={'/register'}>Log in</Link></p>
                        <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Signup
