import React from 'react'
import { Link } from 'react-router-dom';

function Signup() {
    const onSubmit = eve=>{
        eve.preventDefault();
    }
    return (
        
                <form onSubmit={onSubmit}>
                    <h2 className='ttile'>
                        Signup for Free
                    </h2>
                    <input type="text" placeholder='Full Name' id='name' name='name'/>
                    <input type="email" placeholder='Email' id='email' name='name' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <input type="password" name="password_confirmation" id="password_confirmation" placeholder='Confirm your Password' />
                    <button type="submit" className='btn btn-block'>Signup now</button>
                    <p className='message'>
                        You've account ? <Link to="/login" >Login to your account</Link>
                    </p>
                </form>

    )
}

export default Signup