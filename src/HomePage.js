import './HomePage.css'

import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div id="main">
            <div className="section">
                <Link className="btn-container" to="/viewer">
                    <div className="btn-header">Study Cards</div>
                    <svg id="cards-icon" width="170px" height="120px">
                        <rect width="110px" height="80px" x="40" y="10" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                        <rect width="110px" height="80px" x="20" y="25" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                    </svg>
                </Link>
                <Link className="btn-container" to="/editor">
                    <div className="btn-header">Edit Cards</div>
                    <i className="fas fa-marker btn-icon"></i>
                </Link>
            </div>
        </div>
    )
}