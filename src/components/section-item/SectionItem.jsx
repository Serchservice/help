import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

const SectionItem = ({ section = {"title": "", "section": ""}, category}) => {
    return (
        <Link to={`/${ category }/${ section.section }`} className='item-link'>
            <div className="item-item">
                <span className="item-text">{ section.title }</span>
                <Icon icon="solar:arrow-right-broken" className="item-icon"/>
            </div>
        </Link>
    )
}

export default SectionItem
