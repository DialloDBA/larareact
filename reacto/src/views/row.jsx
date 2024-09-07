import React from 'react'
import { Link } from 'react-router-dom'
import now from "dayjs";
import created from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
now.extend(created);
now.locale('fr');
export default function post({post}) {
  const created = now(post.created_at).fromNow(); 
  return (
    <>
    <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">{post.category}</strong>
              <h3 className="mb-0">{post.title}</h3>
              <div className="mb-1 text-muted">{created}</div>
              <p className="mb-auto">{ post.description.length > 10 ? post.description.substring(0,10):  post.description}</p>
              <Link to="/" className="stretched-link">Continue reading</Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            </div>
          </div>
        </div>
    </>
  )
}
