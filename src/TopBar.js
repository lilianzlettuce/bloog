import './TopBar.css'

import { Link } from 'react-router-dom'

export default function TopBar(props) {
    return (
        <div id="topbar">
            <Link to="/">
                <svg id="cards-icon" width="170px" height="120px">
                    <rect class="cards-path" width="110px" height="80px" x="40" y="10" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                    <rect class="cards-path" width="110px" height="80px" x="20" y="25" rx="10" ry="10" stroke="rgb(24, 40, 255)"  strokeLinecap="round" strokeWidth="4" fill="white"/>
                </svg>
            </Link>
        </div>
    )
}