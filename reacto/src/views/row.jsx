import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import { useAuthStateContext } from '../contexts/AuthContextProvider';
dayjs.extend(relativeTime);

export default function Post({ post }) {
  const { defaultLang, setDefaultLang, __lang } = useAuthStateContext();
  const navigate = useNavigate();
  
  // Utilisation de dayjs pour le formatage des dates
  const created = dayjs(post.created_at).fromNow();

  // Utilisation de useEffect pour mettre à jour la langue
  useEffect(() => {
    dayjs.locale(defaultLang || 'fr'); // Utiliser 'fr' comme langue par défaut
  }, [defaultLang]);

const gotoPost = (slug)=>{
  navigate(`/posts/${slug}`);
}

  return (
    <div className="col-md-6">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-success">{post.category}</strong>
          <h3 className="mb-0">{post.title.length >=10 ? `${post.title.substring(0, 30)}...` : post.title}</h3>
          <div className="mb-1 text-muted">{created}</div>
          <p className="mb-auto">
            {post.description.length > 10 ? `${post.description.substring(0, 50)}...` : post.description}
          </p>
          <Link onClick={(e)=>gotoPost(post.slug)} className="stretched-link text-decoration-none" >Lire la suite</Link>
        </div>
        <div className="col-auto d-none d-lg-block">
          <img src={post.image} className="" width="200" height="250" />
        </div>
      </div>
    </div>
  );
}
