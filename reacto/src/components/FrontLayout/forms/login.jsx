import React, { createRef, useEffect, useId, useState } from 'react';
import Loader from '../loader/spinner.jsx'

const login = ({emailRef,passwordRef,rememberRef,showLoader,setLoader,submitLogin })=>{

    const idName = useId();
    const idEmail = useId();
    const idPassword = useId();
    const idRemember = useId();

    return (
        <>
            <form onSubmit={submitLogin}>
                <div className="mb-3">
                    <label htmlFor={idEmail} className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        ref={emailRef}
                        className="form-control"
                        id={idEmail}
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        ref={passwordRef}
                        type="password"
                        className="form-control"
                        id="password"
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" ref={rememberRef} className="form-check-input" id={idRemember} />
                    <label className="form-check-label" htmlFor={idRemember}>
                        Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-success">
                    Login {showLoader && <Loader />}
                </button>
            </form>

        </>
    )
}

export default login;

