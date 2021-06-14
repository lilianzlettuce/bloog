import React from 'react'
import Loader from 'react-loader-spinner'

import './Nonexistant.css'

export default function PageLoading(props) {
    return (
        <div className="page-container">
            <Loader
                type="BallTriangle"
                color="rgb(24, 40, 255)"
                height={200}
                width={100}
                timeout={999999}
            />
        </div>
    )
}