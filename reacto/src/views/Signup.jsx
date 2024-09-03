import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../AxiosClient';
import { useStateContext } from '../contexts/ContextProvider';

function Signup() {

    const [errors, setErrors] = useState(null);
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmRef = useRef("");

    const { setUser, setToken } = useStateContext()
    const onSubmit = eve => {
        eve.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmRef.current.value
        }
        axiosClient.post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                }
            })
    }
    return (

        <form onSubmit={onSubmit}>
            <h2 className='title'>
                Signup for Free
            </h2>
            {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))} 
            </div>
            }
            <input ref={nameRef} type="text" placeholder='Full Name' id='name' name='name' />
            
            <input ref={emailRef} type="email" placeholder='Email' id='email' name='name' />
            <input ref={passwordRef} type="password" name="password" id="password" placeholder='Password' />
            <input ref={passwordConfirmRef} type="password" name="password_confirmation" id="password_confirmation" placeholder='Confirm your Password' />
            <button type="submit" className='btn btn-block'>Signup now</button>
            <p className='message'>
                You've account ? <Link to="/login" >Login to your account</Link>
            </p>
        </form>

    )
}

export default Signup