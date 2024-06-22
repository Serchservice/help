import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useContentful } from 'react-contentful'
import './section.css'
import Footer from '../../components/footer/Footer'
import { Link, Outlet, useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import LinkAssets from '../../assets/LinkAssets'
import Shimmer from '../../components/shimmer/Shimmer'
import Spacer from '../../components/Spacer'
import ItemGenerator from '../../config/ItemGenerator'
import Links from '../../config/Links'
import SearchBar from '../../components/search-bar/SearchBar'
import HelpForm from '../../components/help-form/HelpForm'
import DropdownMenu from '../../components/dropdown-menu/DropdownMenu'
import { Icon } from '@iconify/react/dist/iconify.js'
import GroupItem from '../../components/group-item/GroupItem'

const Section = () => {
    const headerRef = useRef(null);
    const { category, section, faq } = useParams()
    const [ categories, setCategories ] = useState([ ])
    const [ activeCategory, setActiveCategory ] = useState({
        "title": "",
        "category": "",
        "sections": []
    })
    const [ activeSection, setActiveSection ] = useState({
        "title": "",
        "section": "",
        "groups": []
    })
    const [ title, setTitle ] = useState(section)
    const [ isOptionsOpen, setIsOptionsOpen ] = useState(false)
    const [ contentHeaderHeight, setContentHeaderHeight ] = useState("90vh")

    useEffect(() => {
        if (headerRef.current) {
            console.log(headerRef.current.getBoundingClientRect().height)
            const headerHeight = headerRef.current.getBoundingClientRect().height;
            const newHeight = 100 - headerHeight / window.innerHeight * 100;
            setContentHeaderHeight(`${ newHeight }vh`);
        }
    }, []);

    const toggleNav = () => {
        setIsOptionsOpen(!isOptionsOpen)
    }

    const { data, error, fetched, loading } = useContentful({ contentType: 'serchHelpFaqCategory' });
    useEffect(() => {
        if (data && data["items"].length > 0) {
            const categories = data["items"].map((item) => ({
                image: item.fields.image,
                category: item.fields.category,
                order: item.fields.order,
                title: item.fields.title,
                sections: item.fields.sections && item.fields.sections.map((s) => ({
                    title: s.fields.title,
                    section: s.fields.section,
                    groups: s.fields.groups && s.fields.groups.map((g) => ({
                        title: g.fields.title,
                        group: g.fields.group,
                        faqs: g.fields.faqs && g.fields.faqs.map((f) => ({
                            title: f.fields.title,
                            faq: f.fields.faq,
                        }))
                    }))
                }))
            }));
            categories.sort((a, b) => a.order - b.order);
            setCategories(categories);

            const active = categories.find((c) => c.category === category);
            setActiveCategory(active);
        }
    }, [ data, category ]);

    useEffect(() => {
        if (activeCategory && activeCategory.sections.length > 0) {
            const activeSection = activeCategory.sections.find((s) => s.section === section);
            setActiveSection(activeSection);
        }
    }, [ activeCategory, section ]);

    useEffect(() => {
        if(faq !== undefined && faq !== '' && faq !== null) {
            if (activeSection && activeSection.groups && activeSection.groups.length > 0) {
                const activeGroup = activeSection.groups.find((g) => g.group === group);
                if (activeGroup && activeGroup.faqs && activeGroup.faqs.length > 0) {
                    const activeFaq = activeGroup.faqs.find((f) => f.faq === faq);
                    setTitle(activeFaq.title);
                }
            }
        }
    }, [ ]);

    useEffect(() => {
        if (isOptionsOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup function to remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOptionsOpen]);

    if (loading || !fetched) {
        return (
            <div className="section-container">
                <Helmet>
                    <title>{ `Serch Help Hub | ${ title }` }</title>
                    <meta name="description" content={ `Explore question and answers in ${ title }` } />
                    <meta property="og:title" content={ `Serch Help Hub | ${ title }` } />
                    <meta property="og:description" content={ `Explore question and answers in ${ title }` } />
                    <meta property="og:image" content={ LinkAssets.logo } />
                </Helmet>
                <Header reference={ headerRef } />
                <div className='section-body'>
                    <div className='section-body-left'>
                        <div className='section-body-left-header'>
                            <div className='section-body-left-header-dropdown'>
                                <Shimmer height={50} percentWidth='100%'/>
                            </div>
                            <div className='section-body-left-header-menu'>
                                <Shimmer height={50} width={50}/>
                            </div>
                        </div>
                        <Spacer height={"20px"}/>
                        <div className='section-body-left-search'>
                            <Shimmer height={60} percentWidth='100%'/>
                            <Spacer height={"70px"}/>
                        </div>
                        <div className="section-body-left-contents">
                            {
                                ItemGenerator(length = 5).map((_, key) => {
                                    return (
                                        <div key={ key } style={{width: "100%"}}>
                                            <div style={{height: "15px"}} key={ key }></div>
                                            <Shimmer height={60} percentWidth='100%'/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='section-body-right' style={{alignItems: "center"}}></div>
                </div>
                <Footer />
            </div>
        )
    } else if (error || !data || data["items"].length === 0 || activeCategory === undefined || activeSection === undefined) {
        return (
            <div className="section-container">
                <Helmet>
                    <title>{ `Serch Help Hub | ${ title }` }</title>
                    <meta name="description" content={ `Explore question and answers in ${ title }` } />
                    <meta property="og:title" content={ `Serch Help Hub | ${ title }` } />
                    <meta property="og:description" content={ `Explore question and answers in ${ title }` } />
                    <meta property="og:image" content={ LinkAssets.logo } />
                </Helmet>
                <Header reference={ headerRef } />
                <img alt="Error" src={ LinkAssets.error } className="error-image" />
                <div className="error-body">
                    <h1 className="error-text">An error occurred while trying to find the support you were looking for</h1>
                    <Link to={ Links.home } className="error-navlink">
                        <div data-role="accordion-container" className="error-element accordion-element">
                            <div className="error-details">
                                <span className="error-text1"> Head to home </span>
                            </div>
                            <svg viewBox="0 0 1024 1024" data-role="accordion-icon" className="error-icon">
                                <path d="M366 708l196-196-196-196 60-60 256 256-256 256z"></path>
                            </svg>
                        </div>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    } else {
        return (
            <div className="section-container">
                <Helmet>
                    <title>{ `Serch Help Hub | ${ title }` }</title>
                    <meta name="description" content={ `Explore question and answers in ${ title }` } />
                    <meta property="og:title" content={ `Serch Help Hub | ${ title }` } />
                    <meta property="og:description" content={ `Explore question and answers in ${ title }` } />
                    <meta property="og:image" content={ LinkAssets.logo } />
                </Helmet>
                <Header reference={ headerRef } />
                <div className='section-body'>
                    <div className='section-body-left'>
                        <div className='section-body-left-header'>
                            <div className='section-body-left-header-dropdown'>
                                <DropdownMenu list={ categories } text={ activeCategory.title } />
                            </div>
                            {
                                faq !== null && faq !== undefined
                                    ? <div className='section-body-left-header-menu' onClick={ toggleNav }>
                                        <Icon icon="gg:options" width={22} height={22} />
                                    </div>
                                    : null
                            }
                        </div>
                        <Spacer height={"30px"} />
                        <div data-thq="thq-mobile-menu" className="navbar-interactive-mobile-menu-content" style={{
                            transform: isOptionsOpen ? "translateX(0%)" : "translateX(-100%)",
                            display: isOptionsOpen ? "flex" : "none",
                            backgroundColor: "#ffffff",
                            zIndex: "90",
                            height: contentHeaderHeight
                        }}>
                            <div className="navbar-interactive-nav">
                                <div className="navbar-interactive-top">
                                    <h2>{ activeCategory.title }</h2>
                                    <div data-thq="thq-close-menu" className="navbar-interactive-close-menu" onClick={ toggleNav }>
                                        <Icon icon="solar:arrow-left-line-duotone" color='#030001' width={35}/>
                                    </div>
                                </div>
                                <SearchBar placeholder="Search keywords, questions and topics"/>
                                <Spacer height={"40px"} />
                                <span>{ activeSection.title }</span>
                                <Spacer height={"15px"} />
                                <div className="navbar-interactive-links">{activeSection.groups.map((group, key) => {
                                    return (
                                        <GroupItem
                                            key={ key }
                                            groupData={ group }
                                            category={ category }
                                            section={ section }
                                            needSpacer={ false }
                                        />
                                    )
                                })}</div>
                                <Spacer height={50}/>
                                <HelpForm />
                            </div>
                        </div>
                        <div className='section-body-left-search'>
                            <SearchBar placeholder="Search keywords, questions and topics"/>
                            <Spacer height={"40px"} />
                        </div>
                        <div className="section-body-left-contents hide-small">
                            <p>{ activeSection.title }</p>
                            <Spacer height={"12px"} />
                            {activeSection.groups.map((group, key) => {
                                return (
                                    <GroupItem
                                        key={ key }
                                        groupData={ group }
                                        category={ category }
                                        section={ section }
                                    />
                                )
                            })}
                            <Spacer height={50}/>
                            <HelpForm />
                        </div>
                    </div>
                    <div className='section-body-right'>
                        <div className="section-body-left-contents hide-large">
                            <p>{ activeSection.title }</p>
                            <Spacer height={"12px"} />
                            {activeSection.groups.map((group, key) => {
                                return (
                                    <GroupItem
                                        key={ key }
                                        groupData={ group }
                                        category={ category }
                                        section={ section }
                                    />
                                )
                            })}
                        </div>
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Section