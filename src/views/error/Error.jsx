import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './error.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import Links from '../../config/Links'
import { Icon } from '@iconify/react'
import LinkAssets from '../../assets/LinkAssets'

const Error = () => {
    const links = [
        {
            "link": Links.home,
            "name": "Head to serchservice.com"
        },
        {
            "link": Links.careers,
            "name": "Head to careers"
        },
        {
            "link": Links.business,
            "name": "Head to Serch Business"
        },
        {
            "link": Links.countries,
            "name": "See countries in Serch"
        },
        {
            "link": Links.requesting,
            "name": "See how requesting works"
        },
        {
            "link": Links.providing,
            "name": "Understand how to flex your providing skills"
        }
    ]

    return (
        <div className="error-container">
            <Helmet>
                <title>404 Error | Serch</title>
                <meta name="description" content="Oops! Unknown page route" />
                <meta property="og:title" content="404 Error | Serch" />
                <meta property="og:description" content="A requestSharing and provideSharing company" />
                <meta property="og:image" content={ LinkAssets.logo } />
            </Helmet>
            <Header />
            <img alt="Error" src={ LinkAssets.error } className="error-image" />
            <div className="error-body">
                <h1 className="error-text">
                    Sorry, we couldn&apos;t find the page you were looking for. Try
                    re-entering the address, or choose one of the options below.
                </h1>
                {
                    links.map((value, key) => {
                        return (
                            <Link to={ value.link } key={ key } className="error-navlink">
                                <div data-role="accordion-container" className="error-element accordion-element">
                                    <div className="error-details">
                                        <span className="error-text1">{ value.name }</span>
                                    </div>
                                    <Icon icon="ep:arrow-right-bold" data-role="accordion-icon" className="error-icon"/>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <Footer />
        </div>
    )
}

export default Error
