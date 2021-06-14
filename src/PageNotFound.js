import React from 'react'
import './Nonexistant.css'

export default function PageNotFound(props) {
    return (
        <div className="page-container">
            <div className="message-container">
                <h1>Oops! <br/> The page you are looking for does not exist :/</h1>
                <button>Back to Home</button>
            </div>
        </div>
    )
}