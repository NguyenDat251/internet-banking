import React from 'react'
import './title.scss'

const Title = (props) => {
    return (
        <div className="empContentTitle">
            <span className="text-white font-weight-bolder">{props.title}</span>
        </div>
    )
}

export default Title
