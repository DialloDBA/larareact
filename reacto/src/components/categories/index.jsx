import React, { useEffect, useId, useMemo, useState } from "react";
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
                setCats(data.categories);
            })
            .catch((erroe) => {
                console.log(erroe)
            })
    }
    const MemoCats = useMemo(()=>cats,[cats]);
    return (
        <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-between">
                <a className="p-2 link-secondary" href="#">
                    World
                </a>
                {
                    MemoCats && MemoCats.length > 0 && cats.map((c, index) => {
                        return (
                            <Link to={`/categories/${c.id}`} className="p-2 link-secondary" key={c.id}>
                                {c.name}
                            </Link>
                        );
                    })
                }


            </nav>
        </div>
    );
}
