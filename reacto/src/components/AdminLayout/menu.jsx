import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function menu({ active, setActiveMenu }) {
    const [ma , _setMa ] = useState('');
    const currentUrl = useLocation();
    useEffect(() => {
        if (currentUrl.pathname ==='/admin/categories') {
            setActiveMenu(currentUrl.pathname,'/admin/categories');
        } else if (currentUrl.pathname === '/admin') {
            setActiveMenu(currentUrl.pathname,'/admin');
        }
        active ? _setMa('active') : '';
    }, [currentUrl.pathname, setActiveMenu]);

    return (
        <>
            <nav
                id="sidebarMenu"
                className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
                <div className="position-sticky pt-3 sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className={`nav-link ${(currentUrl.pathname=='/admin') && ma}`} aria-current="page" to="/admin">
                                <span data-feather="home" className="align-text-bottom" />
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/admin">
                                <span data-feather="home" className="align-text-bottom" />
                                Categories
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span
                                    data-feather="shopping-cart"
                                    className="align-text-bottom"
                                />
                                Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="users" className="align-text-bottom" />
                                Customers
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span
                                    data-feather="bar-chart-2"
                                    className="align-text-bottom"
                                />
                                Reports
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="layers" className="align-text-bottom" />
                                Integrations
                            </a>
                        </li>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                        <span>Categories</span>
                        <a
                            className="link-secondary"
                            href="#"
                            aria-label="Add categories"
                        >
                            <span data-feather="plus-circle" className="align-text-bottom" />
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <Link className={`nav-link ${(currentUrl.pathname=='/admin/categories') && ma}`} aria-current="page" to="/admin/categories">
                                <span data-feather="home" className="align-text-bottom" />
                                Categories
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    )
}
