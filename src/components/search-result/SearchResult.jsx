import React from 'react'
import './search-result.css'
import { Icon } from '@iconify/react'

const SearchResult = ({ image, header, section, category, link }) => {
    return (
        <a href={ link }>
            <div className="search-result-search-result">
                <img alt="result-image" src={ image } className="search-result-search-result-image" />
                <div className="search-result-search-result-content-row">
                    <div className="search-result-search-result-content">
                        <span className="search-result-search-question">{ header }</span>
                        <span className="search-result-search-category">{ category }</span>
                    </div>
                </div>
                <Icon icon="solar:arrow-right-broken" className="search-result-search-result-icon" />
            </div>
        </a>
    )
}

export default SearchResult