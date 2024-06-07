import React, { useEffect, useState } from 'react'
import './header.css'
import Assets from '../../assets/Assets'
import { Link } from 'react-router-dom'
import Links from '../../config/Links'

const Header = () => {
    const [open, setOpen] = useState(false)
    const topLinks = [
        {
            "link": Links.aboutUs,
            "name": "About Us"
        },
        {
            "link": Links.blogs,
            "name": "Blog"
        },
        {
            "link": Links.newsroom,
            "name": "Newsroom"
        },
        {
            "link": Links.marketplace,
            "name": "Marketplace"
        },
        {
            "link": Links.careers,
            "name": "Careers"
        },
    ]

    const bottomLinks = [
        {
            "link": Links.home,
            "name": "Help"
        },
        {
            "link": "",
            "name": "Log In"
        },
    ]

    const toggleMobileMenu = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if (open) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup function to remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [open]);

    return (
        <div className={"navbar-interactive-container"}>
            <header data-thq="thq-navbar" className="navbar-interactive-navbar-interactive">
                <a href={Links.serch} className="navbar-interactive-link">
                    <img alt="Serch" src={Assets.lightLogo1500} className="navbar-interactive-image mouse" />
                </a>
                <div data-thq="thq-navbar-nav" className="navbar-interactive-desktop-menu">
                    <div className="navbar-interactive-nav-content">
                        <div className="navbar-interactive-nav-links">
                            <span className="navbar-interactive-link1 nav-link">Log In</span>
                        </div>
                        <div className="get-started navbar-interactive-get-started">
                            <span className="navbar-interactive-text">Get Started</span>
                        </div>
                    </div>
                </div>
                <div data-thq="thq-burger-menu" className="navbar-interactive-burger-menu get-started" onClick={toggleMobileMenu}>
                    <img alt="menu" src={Assets.menuIcon} className="navbar-interactive-image2" />
                </div>
                <div data-thq="thq-mobile-menu" className="navbar-interactive-mobile-menu" style={{
                    transform: open ? "translateX(0%)" : "translateX(100%)",
                    display: open ? "flex" : "none"
                }}>
                    <div className="navbar-interactive-nav">
                        <div className="navbar-interactive-top">
                            <img alt="Serch" src={Assets.lightLogo1500} className="navbar-interactive-logo" />
                            <div data-thq="thq-close-menu" className="navbar-interactive-close-menu" onClick={toggleMobileMenu}>
                                <svg viewBox="0 0 1024 1024" className="navbar-interactive-icon">
                                    <path
                                        d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                                        className=""
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div className="navbar-interactive-links">
                            {
                                topLinks.map((value, key) => {
                                    return (
                                        <Link to={value.link} key={key}>
                                            <span className="navbar-interactive-text1 footer-link">
                                                {value.name}
                                            </span>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className="navbar-interactive-container1">
                            <div className="navbar-interactive-nav-links1">
                                {
                                    bottomLinks.map((value, key) => {
                                        return (
                                            <Link to={value.link} key={key}>
                                                <span className="nav-link navbar-interactive-link2">
                                                    {value.name}
                                                </span>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            <div className="get-started navbar-interactive-get-started1">
                                <span className="navbar-interactive-text6">Get Started</span>
                            </div>
                        </div>
                        <div className="navbar-interactive-ios button">
                            <img alt="Play Store" src={Assets.android} className="navbar-interactive-icon3" />
                            <span className="navbar-interactive-text">Coming soon</span>
                        </div>
                        <div className="navbar-interactive-android button">
                            <img alt="Apple Store" src={Assets.apple} className="navbar-interactive-icon3" />
                            <span className="navbar-interactive-text">Coming soon</span>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
