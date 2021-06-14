import React from 'react'
import './Nonexistant.css'

import { Link } from 'react-router-dom'

export default function PageNotFound(props) {
    return (
        <div className="page-container">
            <div className="message-container">
                <h1>Oops! <br/> The page you are looking for does not exist :/</h1>
                <Link to="/" className="not-found-link">Back to Home</Link>
            </div>
        </div>
    )
}