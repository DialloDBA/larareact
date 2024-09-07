import React, { useEffect, useState } from 'react'
import axiosClient from '../axios/axiosClient';
import Post from "./row.jsx";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/FrontLayout/loader/Loader';

export default function home({ posts }) {
  const [title, setTitle] = useState(`Bienvenue sur ${import.meta.env.VITE_APP_NAME}`);
  const navigate = useNavigate();
  const [latest, setLatest] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    document.title = title;
    getLatestPosts();
  }, [title]);
  const getLatestPosts = () => {
    axiosClient.get("/app/")
      .then(({ data }) => {
        setLoader(false);
        data.categories.forEach(element => {
          let pp = element.posts;
          let cat = element.name;
          pp.map(p => {
            setLatest(prevLatest => [...prevLatest, { ...p, category: cat }]);
          });
        });
      })
      .catch((error) => {
        setLoader(false);
        console.log(error)
      })
  }
  const gotoPost = (slug)=>{
    navigate(`/posts/${slug}`);
  }
  return (
    <>

    {loader && <Loader />}
      {
        latest.map((p, index) => {
         return index === 0 ? (
            <div key={p.slug} className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
              <div className="col-md-6 px-0">
                <h1 className="display-4 fst-italic">{p.title}</h1>
                <p className="lead my-3">
                {p.description.length > 10 ? `${p.description.substring(0, 50)}...` : p.description}
                </p>
                <p className="lead mb-0">
                <Link onClick={(e)=>gotoPost(p.slug)} className="text-white fw-bold text-decoration-none" >Lire la suite...</Link>
                </p>
              </div>
            </div>
          ) : ''
        })
      }
      <div className="row mb-2">
        {
          latest.map((p, index) => {
            return  index !== 0 && <Post post={p} key={index} />
          })
        }
      </div>
    </>
  )
}
