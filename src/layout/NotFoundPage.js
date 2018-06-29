import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <center>
        <h1>Page Not Found - <Link to='/' >Go Home</Link></h1>
    </center>
);

export default NotFoundPage;