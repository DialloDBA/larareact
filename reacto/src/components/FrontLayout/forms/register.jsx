import React, { createRef, useEffect, useId, useState } from 'react'
import Loader from "../loader/spinner.jsx";
export default function register({nameRef,emailRef,passwordRef,passwordConfirmationRef,rememberRef,showLoader,setLoader,submitRegister }) {


    const idName = useId();
    const idEmail = useId();
    const idPassword = useId();
    const idConfirm = useId();

    
    return (
        <>
            <form onSubmit={submitRegister}>
                <div className="mb-3">
                    <label htmlFor={idName} className="form-label">
                        Full name
                    </label>
                    <input
                        type="name"
                        ref={nameRef}
                        className="form-control"
                        id={idName}
                        aria-describedby="nameHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
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
                    <label htmlFor={idPassword} className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        ref={passwordRef}
                        id={idPassword}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor={idConfirm} className="form-label">
                        Password
                    </label>
                    <input
                    ref={passwordConfirmationRef}
                        type="password"
                        className="form-control"
                        id={idConfirm}
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    create your account {showLoader && <Loader />}
                </button>
            </form>

        </>
    )
}
