import './HomePage.css'

import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
            <div className="section">
                <div className="container-btn">
                    <Link to="/viewer">Study Cards</Link>
                </div>
                <div className="container-btn">
                    <Link to="/editor">Edit Cards</Link>
                </div>
            </div>
        </div>
    )
}