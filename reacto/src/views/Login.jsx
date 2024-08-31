import React from 'react'
import { Link } from 'react-router-dom';

function Login() {

    const onSubmit = eve =>{
        eve.preventDefault();
        console.log(eve.target)
    }

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <input type="email" placeholder='Email' id='email' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <button type="submit" className='btn btn-block'>Login</button>
                    <p className='message'>
                        Not Registered ? <Link to="/signup" >Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login