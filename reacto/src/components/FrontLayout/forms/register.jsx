import React, { useId, useState } from 'react'
import Loader from "../loader/spinner.jsx";
export default function register({ errors, nameRef, emailRef, passwordRef, passwordConfirmationRef, rememberRef, showLoader, setLoader, submitRegister }) {


    const idName = useId();
    const idEmail = useId();
    const idPassword = useId();
    const idConfirm = useId();

    

    return (
        <>
            <form onSubmit={submitRegister} >
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
                    {errors.name && errors.name.length > 0 && (
                        <span className="text-danger text-sm">
                            {errors.name[0]}
                        </span>
                    )}


                </div>
                <div className="mb-3">
                    <label htmlFor={idEmail} className="form-label">
                        Email address
                    </label>
                    <input
                        type="text"
                        ref={emailRef}
                        className="form-control"
                        id={idEmail}
                        aria-describedby="emailHelp"
                    />
                    {errors.email && errors.email.length > 0 && (
                        <span className="text-danger text-sm">
                            {errors.email[0]}
                        </span>
                    )}
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
                    {errors.password && errors.password.length > 0 && (
                        <span className="text-danger text-sm">
                            {errors.password[0]}
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor={idConfirm} className="form-label">
                        Confirm Password
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
