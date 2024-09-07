import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios/axiosClient';
import Post from '../../views/row.jsx';
import Loader from '../FrontLayout/loader/Loader.jsx';
export default function Single() {
    const { slug } = useParams();

    const navigate = useNavigate();
    if (!slug) {
        navigate('/categories');
    }

    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState({});
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        loadCategory();
    }, [slug]);

    const loadCategory = () => {
        setLoader(true);
        axiosClient.get(`/app/categories/${slug}`)
            .then(({ data }) => {
                setLoader(false);
                if (data.posts.length > 0) {
                    setPosts(data.posts);
                }else{
                    setPosts({});
                }
                setCategory(data);
            })
            .catch((err) => {
                setLoader(false);
                if (err.status === 404) {
                    console.log(err);
                    navigate('/categories');
                }
            })
    }
    return (
        <>
            {loader ? <Loader/> : <h1>Page for: {category.name} ({posts.length})</h1>}
            <div className="row mb-2">
                {
                    posts && posts.length > 0 && posts.map((post, index) => {
                        return (
                            <Post post={{...post, category: category.name}} key={post.id} />
                        );
                    })
                }

            </div>

        </>
    );
}
