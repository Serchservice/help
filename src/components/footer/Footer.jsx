import React from 'react'
import Assets from '../../assets/Assets'
import './footer.css'
import Links from '../../config/Links';

const Footer = () => {
    const footerLinks = [
        {
            "main": "Company",
            "children": [
                {
                    "key": "About Us",
                    "link": Links.aboutUs
                },
                {
                    "key": "Blog",
                    "link": Links.blogs
                },
                {
                    "key": "Newsroom",
                    "link": Links.newsroom
                },
                {
                    "key": "Marketplace",
                    "link": Links.marketplace
                },
                {
                    "key": "Careers",
                    "link": Links.careers
                },
            ]
        },
        {
            "main": "Product",
            "children": [
                {
                    "key": "Request",
                    "link": Links.request
                },
                {
                    "key": "Provide",
                    "link": Links.provide
                },
                {
                    "key": "Business",
                    "link": Links.business
                },
                {
                    "key": "Guest",
                    "link": Links.guest
                },
                {
                    "key": "Tip2Fix",
                    "link": Links.tip2fix
                },
            ]
        },
        {
            "main": "Information",
            "children": [
                {
                    "key": "Safety Guidelines",
                    "link": Links.safety
                },
                {
                    "key": "Countries In Serch",
                    "link": Links.countries
                },
            ]
        },
        {
            "main": "Support",
            "children": [
                {
                    "key": "Legal Hub",
                    "link": Links.legal
                },
                {
                    "key": "Support Hub",
                    "link": Links.support
                },
            ]
        },
    ];

    const socialLinks = [
        {
            "link": Links.linkedIn,
            "alt": "LinkedIn",
            "icon": Assets.linkedInIcon,
        },
        {
            "link": Links.instagram,
            "alt": "Instagram",
            "icon": Assets.instagramIcon,
        },
        {
            "link": Links.twitter,
            "alt": "Twitter",
            "icon": Assets.twitterIcon,
        },
        {
            "link": Links.youtube,
            "alt": "YouTube",
            "icon": Assets.youtubeIcon,
        }
    ]

    const footerCopyright = [
        {
            "name": "Terms and Conditions",
            "link": Links.termsAndConditions
        },
        {
            "name": "Accessibility",
            "link": Links.accessibility
        },
        {
            "name": "Privacy",
            "link": Links.privacyPolicy
        }
    ]

    return (
        <footer className={"footer-footer"}>
            <div className="footer-content">
                <main className="footer-main-content">
                    <div className="footer-container">
                        <div className="footer-header">
                            <a href={ Links.serch } className="footer-link">
                                <img alt="Logo" src={Assets.lightLogo200} className="footer-branding mouse"/>
                            </a>
                            <img alt="Service made easy" src={Assets.tagWhite} className="footer-image"/>
                        </div>
                    </div>
                    <header className="footer-categories">
                        {
                            footerLinks.map((value, key) => {
                                return (
                                    <div key={ key } className="footer-category">
                                        <div className="footer-category-header">
                                            <span className="footer-header">{ value.main }</span>
                                        </div>
                                        <div className="footer-links">
                                            {
                                                value.children.map((child, key) => {
                                                    return (
                                                        <a href={ child.link } key={ key }>
                                                            <span className="footer-text01 footer-link">{ child.key }</span>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </header>
                    <div className="footer-socials">
                        {
                            socialLinks.map((value, key) => {
                                return (
                                    <a key={ key } href={ value.link } target="_blank" rel="noreferrer noopener" className="footer-link1">
                                        <img alt={ value.alt } src={ value.icon } className="social"/>
                                    </a>
                                )
                            })
                        }
                    </div>
                    <section className="footer-copyright">
                        <span className="footer-text-copy">© 2023 Serchservice Inc. All Rights Reserved.</span>
                        <div className="footer-copy-links">
                            {
                                footerCopyright.map((value, key) => {
                                    return (
                                        <a href={ value.link } key={ key }>
                                            <span className="footer-text21">{ value.name }</span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                </main>
            </div>
        </footer>
    )
}

export default Footer
