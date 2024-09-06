import React from 'react';
import { useParams } from 'react-router-dom';

export default function Single() {
    const { slug } = useParams();
    console.log(slug);

    return (
        <div>
            <h1>Page for: {slug}</h1>
        </div>
    );
}
