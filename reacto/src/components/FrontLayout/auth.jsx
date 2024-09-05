import React from 'react'
import { Link } from 'react-router-dom'

export default function auth({user,logoutUser}) {
  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
         {user.name}
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item"to="/admin">
            Administration 
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" onClick={logoutUser}>
            Se deconnecter 
            </Link>
          </li>
        </ul>
      </div>

    </>
  )
}
