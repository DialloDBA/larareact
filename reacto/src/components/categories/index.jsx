import React, { useEffect, useId, useState } from "react";
import axiosClient from "../../axios/axiosClient";
import { Link } from "react-router-dom";

export default function index() {
    const [cats, setCats] = useState({});
    useEffect(() => {
        categories();
    }, []);

    const categories = () => {
        axiosClient.get('/categories')
            .then(({ data }) => {
                console.log(data.categories);
                setCats(data.categories);
            })
            .catch((erroe) => {
                console.log(erroe)
            })
    }
    return (
        <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-between">
                <a className="p-2 link-secondary" href="#">
                    World
                </a>
                {
                    cats && cats.length > 0 && cats.map((c, index) => {
                        return (
                            <Link to="/" className="p-2 link-secondary" key={c.id}>
                                {c.name}
                            </Link>
                        );
                    })
                }


            </nav>
        </div>
    );
}
