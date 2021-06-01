import './HomePage.css'

import TopBar from './TopBar'

import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div id="main">
            <TopBar />
            <div className="section">
                <Link className="btn-container" to="/viewer">
                    
                </Link>
                <Link className="btn-container" to="/editor">
                    <i className="fas fa-marker btn-icon"></i>
                </Link>
            </div>
        </div>
    )
}