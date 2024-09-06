import React, { createRef, useEffect, useId, useState } from 'react';
import Loader from '../loader/spinner.jsx'

const login = ({errors,emailRef,passwordRef,rememberRef,showLoader,setLoader,submitLogin })=>{

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
                        aria-describedby="emailHelpLogin"
                    />
                    {errors.email && errors.email.length > 0 && (
                        <span className="text-danger text-sm">
                            {errors.email[0]}
                        </span>
                    )}
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
                    {errors.password && errors.password.length > 0 && (
                        <span className="text-danger text-sm">
                            {errors.password[0]}
                        </span>
                    )}
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

