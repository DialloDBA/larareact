import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../AxiosClient.js';

function Login() {

    

    const [errors, setErrors] = useState(null);
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const { setUser, setToken } = useStateContext()
    const onSubmit = eve => {
        eve.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login", payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    }else{
                        
                        setErrors({
                            email : [response.data.message]
                        })
                    }
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='ttile  '>
                Login to your account
            </h2>
            {errors && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))} 
            </div>
            }
            <input ref={emailRef} type="email" placeholder='Email' id='email' />
            <input ref={passwordRef} type="password" name="password" id="password" placeholder='Password' />
            <button type="submit" className='btn btn-block'>Login</button>
            <p className='message'>
                Not Registered ? <Link to="/signup" >Create an Account</Link>
            </p>
        </form>
    )
}

export default Login