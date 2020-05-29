import React from 'react'
import './title.scss'

const Title = (props) => {
    return (
        <div className="contentTitle">
            <span className="text-white font-weight-bolder">{props.title}</span>
        </div>
    )
}

export default Title
