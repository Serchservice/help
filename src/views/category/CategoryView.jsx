import React, { useEffect, useState } from 'react'
import { useContentful } from 'react-contentful'
import './category.css'
import Footer from '../../components/footer/Footer'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import LinkAssets from '../../assets/LinkAssets'
import Shimmer from '../../components/shimmer/Shimmer'
import ItemGenerator from '../../config/ItemGenerator'
import Links from '../../config/Links'
import DropdownMenu from '../../components/dropdown-menu/DropdownMenu'
import { Icon } from '@iconify/react/dist/iconify.js'
import SearchBar from '../../components/search-bar/SearchBar'
import SectionItem from '../../components/section-item/SectionItem'
import DownloadBusinessApp from '../../components/app-download/DownloadBusinessApp'
import DownloadProviderApp from '../../components/app-download/DownloadProviderApp'
import DownloadUserApp from '../../components/app-download/DownloadUserApp'
import Spacer from '../../components/Spacer'
import Title from '../../config/Title'

const CategoryView = () => {
    const { category } = useParams()
    const [ categories, setCategories ] = useState([ ])
    const [ active, setActive ] = useState({
        "title": "",
        "category": "",
        "sections": []
    })

    const { data, error, fetched, loading } = useContentful({ contentType: 'serchHelpFaqCategory' });
    useEffect(() => {
        if(data && data["items"].length > 0) {
            const categories = data["items"].map((item) => ({
                image: item.fields.image,
                category: item.fields.category,
                order: item.fields.order,
                title: item.fields.title,
                sections: item.fields.sections && item.fields.sections.map((s) => ({
                    title: s.fields.title,
                    section: s.fields.section,
                }))
            }));
            categories.sort((a, b) => a.order - b.order);
            setCategories(categories)

            setActive(categories.find((c) => c.category === category));
        }
    }, [ data ]);

    if (loading || !fetched) {
        return (
            <div className="category-container">
                <Title title={ category } description={`Explore question and answers in ${ category }`} />
                <Header />
                <div className="category-body">
                    <div className="category-header">
                        <Shimmer height={50} percentWidth={"45%"}/>
                        <Shimmer height={50} percentWidth={"45%"}/>
                    </div>
                    <Shimmer height={60} percentWidth='90%'/>
                    <Spacer height={"100px"}/>
                    <Shimmer height={220} percentWidth='100%'/>
                    <Spacer height={"50px"} />
                    {
                        ItemGenerator(length = 5).map((_, key) => {
                            return (
                                <div key={ key } style={{width: "100%"}}>
                                    <div style={{height: "15px"}} key={ key }></div>
                                    <Shimmer height={50} percentWidth='100%'/>
                                </div>
                            )
                        })
                    }
                </div>
                <Footer />
            </div>
        )
    } else if (error || !data || data["items"].length === 0 || active === undefined) {
        return (
            <div className="category-container">
                <Title title={ category } description={`Explore question and answers in ${ category }`} />
                <Header />
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
            <div className="category-container">
                <Title title={ active.title } description={`Explore question and answers in ${ active.title }`} />
                <Header />
                <div className="category-body">
                    <div className="category-header">
                        <DropdownMenu list={ categories } text={ active.title } />
                        <Link to={ Links.home }>
                            <div className="mouse">
                                <Icon icon="solar:arrow-left-line-duotone" />
                                <span className="category-text">Back to Help Hub</span>
                                <span className="category-text1">
                                <span className="category-text2">Back</span>
                                <br></br>
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div className='home-search-view'>
                        <SearchBar placeholder="Search keywords, questions and topics"/>
                    </div>
                    <div style={{height: "50px"}}></div>
                    {
                        category === "business"
                            ? (<DownloadBusinessApp />)
                            : category === "provider" || category === "providesharing"
                            ? (<DownloadProviderApp />)
                            : (<DownloadUserApp />)
                    }
                    <div style={{height: "80px"}}></div>{
                        active.sections.length === 0
                            ? (
                                <div className="search-no-result">
                                    <span className="search-text7">No content for this category yet</span>
                                </div>
                            )
                            : active.sections.map((value, key) => {
                                return <SectionItem key={ key } section={ value } category={ category }/>
                            })
                    }</div>
                <Footer />
            </div>
        )
    }
}

export default CategoryView