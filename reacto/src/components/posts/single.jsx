import React, { createRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios/axiosClient';
import Post from '../../views/row.jsx';
import Loader from '../FrontLayout/loader/Loader.jsx';
import commentForm from "../FrontLayout/forms/commentForm.jsx";
import Spin from '../FrontLayout/loader/spinner.jsx';
import { useAuthStateContext } from '../../contexts/AuthContextProvider.jsx';
export default function Single() {
    const { slug } = useParams();

    const navigate = useNavigate();
    const {token,user} = useAuthStateContext();
    if (!slug) {
        navigate('/');
    }

    const [post, setPost] = useState({});
    const [u, setU] = useState({});
    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loader, setLoader] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const commentRef = createRef('');

    const onSubmitComment = (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log(commentRef);
        setSpinner(true);
    }
    useEffect(() => {
        getPost();
    }, [slug]);


    const getPost = () => {
        setLoader(true);
        axiosClient.get(`/app/posts/${slug}`)
            .then(({ data }) => {
                setLoader(false);
                setU(data.userpost || {});
                setCategory(data.category || {});
                setPosts(data.related || []);
                setComments(data.comments || []);
                setPost(data.post || {});
            })
            .catch((err) => {
                setLoader(false);
                if (err.status === 404) {
                    console.log(err);
                    navigate('/');
                }
            })
    }
    return (
        <>
            <h1>{post.title}</h1>
            {loader && <Loader />}
            <div className="row g-5">
                <div className="col-md-8">
                    <h4 className="pb-4 mb-4 fst-italic border-bottom h6">{category.name}</h4>
                    <div className="mb-4 rounded">
                        <img src={post.image_max} alt={post.name} className='img-fluid' loading="lazy" />
                    </div>
                    <article className="blog-post">
                        <p className="blog-post-meta">
                            January 1, 2021 by <a href="#">{u.name}</a>
                        </p>
                        <p>
                            {post.description}
                        </p>
                        <hr />
                        {(!token) && (
                            <button onClick={(e)=>(document.getElementById('handleAuthModal').click())} className='btn btn-md btn-success w-100' type="submit">Se Connecter pour commenter</button>
                        )}
                        {(token) && (
                        <form onSubmit={onSubmitComment}>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Example textarea {user.name}
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows={6}
                                    ref={commentRef}
                                    placeholder='Laisser un commentaire...'
                                    defaultValue={""}
                                />
                            </div>
                            <button className='btn btn-md btn-success w-100' type="submit">Commenter { spinner && <Spin />} </button>


                        </form>
                        )}


                    </article>

                    <article className="blog-post">
                        <h2 className="blog-post-title mb-1">Articles associés</h2>
                    </article>

                </div>
                <div className="col-md-4">
                    <div className="position-sticky" style={{ top: "2rem" }}>
                        <div className="p-4 mb-3 bg-light rounded">
                            <h4 className="fst-italic">About</h4>
                            <p className="mb-0">
                                Customize this section to tell your visitors a little bit about your
                                publication, writers, content, or something else entirely. Totally up
                                to you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                {
                    posts && posts.length > 0 && posts.map((post, index) => {
                        return (
                            <Post post={{ ...post, category: category.name }} key={post.id} />
                        );
                    })
                }

            </div>


        </>
    );
}
