import './HomePage.css'

import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div id="main">
            <div className="section">
                <Link className="btn-container" to="/viewer">
                    <div className="btn-header">Study Cards</div>
                </Link>
                <Link className="btn-container" to="/editor">
                    <div className="btn-header">Edit Cards</div>
                </Link>
            </div>
        </div>
    )
}