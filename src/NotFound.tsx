import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from './404.jpg';

type Props = {};

export const NotFound = (props: Props) => {
    return (
        <div style={{ textAlign: 'center', maxWidth: '100%' }}>
            <img src={notFoundImage} alt='not found' style={{ width: '100%', height: 'auto' }} />
            <p style={{ fontSize: '18px', margin: '20px 0' }}>The page you are looking for could not be found.</p>
            <Link to={"/"} style={{ textDecoration: 'none', color: '#007BFF', fontSize: '16px' }}>Home</Link>
        </div>
    );
};
