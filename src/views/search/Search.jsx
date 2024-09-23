import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import './search.css'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Links from '../../config/Links'
import { Icon } from '@iconify/react'
import SearchResult from '../../components/search-result/SearchResult'
import Spacer from '../../components/Spacer'
import Assets from '../../assets/Assets'
import ItemGenerator from '../../config/ItemGenerator'
import Shimmer from '../../components/shimmer/Shimmer'
import LinkAssets from '../../assets/LinkAssets'
import { ContentfulClient } from 'react-contentful'
import Keys from '../../api/Keys'
import Title from '../../config/Title'

const Search = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || '')
    const [result, setResult] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    const client = new ContentfulClient({
        accessToken: Keys.contentfulToken,
        space: Keys.contentfulSpace,
    });

    useEffect(() => {
        search(new URLSearchParams(location.search).get('q') || '');
    }, [location.search]);

    const search = async (query) => {
        setQuery(query);
        setIsLoading(true)
        try {
            const entries = await client.getEntries({
                content_type: 'serchHelpFaqCategory',
                query: query
            });
            setIsLoading(false)
            if (entries.items.length > 0) {
                const categories = entries.items.map((item) => ({
                    image: item.fields.image,
                    category: item.fields.category,
                    order: item.fields.order,
                    title: item.fields.title,
                    sections: item.fields.sections?.map((s) => ({
                        title: s.fields?.title ?? '',
                        section: s.fields?.section ?? '',
                        groups: s.fields?.groups?.map((g) => ({
                            title: g.fields?.title ?? '',
                            group: g.fields?.group ?? '',
                            faqs: g.fields?.faqs?.map((f) => ({
                                title: f.fields?.title ?? '',
                                faq: f.fields?.faq ?? '',
                            })) ?? []
                        })) ?? []
                    })) ?? []
                }));
                categories.sort((a, b) => a.order - b.order);
                const newList = [];

                categories.forEach(category => {
                    if (category.sections) {
                        category.sections.forEach(section => {
                            // Add section level items
                            if(section.title !== '' && section.section !== '') {
                                newList.push({
                                    question: section.title,
                                    category: category.title,
                                    link: `${category.category}/${section.section}`,
                                    image: category.image
                                });
                            }

                            if (section.groups) {
                                section.groups.forEach(group => {
                                    // Add group level items
                                    if(group.title !== '' && group.group !== '') {
                                        newList.push({
                                            question: group.title,
                                            category: category.title,
                                            link: `${category.category}/${section.section}/${group.group}`,
                                            image: category.image
                                        });
                                    }

                                    if (group.faqs) {
                                        group.faqs.forEach(faq => {
                                            // Add faq level items
                                            if(faq.title !== '' && faq.faq !== '') {
                                                newList.push({
                                                    question: faq.title,
                                                    category: category.title,
                                                    link: `${category.category}/${section.section}/${group.group}/${faq.faq}`,
                                                    image: category.image
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

                setResult(newList);
            } else {
                setResult([]);
            }
        } catch (_) {
            setIsLoading(false)
            setResult([]);
        }
    }

    const handleSearch = () => {
        if (query === null || query === '') {
            return
        } else {
            navigate(`${Links.search}?q=${query}`)
        }
    }

    if (isLoading) {
        return (
            <div className="search-container">
                <Title title="Search Results" description={`Search results for ${query}`} />
                <Header />
                <div className="search-body">
                    <div className="search-header">
                        <span className="search-text overflow">Search - {query}</span>
                        <Link to={Links.home}>
                            <div className="mouse">
                                <Icon icon="solar:arrow-left-line-duotone" />
                                <span className="search-text1">Back to Help Hub</span>
                                <span className="search-text2">
                                    <span className="search-text3">Back</span>
                                    <br></br>
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div style={{ width: "95%" }}>
                        <div className="search-bar">
                            <div className="searchBox">
                                <div className="searchInput">
                                    <div className="searchInputAndIcon">
                                        <img alt="" src={Assets.searchIcon} width={25} height={25} />
                                        <input
                                            type="text"
                                            placeholder="What do you need help with?"
                                            onChange={e => setQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="searchBtn" onClick={handleSearch}>
                                    <span>Search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "100px" }}></div>
                    <span className="search-text6">Search Results</span>
                    {ItemGenerator(length = 5).map((_, key) => {
                        return (
                            <div key={key} style={{ width: "100%" }}>
                                <div style={{ height: "15px" }} key={key}></div>
                                <Shimmer height={80} percentWidth='100%' />
                            </div>
                        )
                    })}
                </div>
                <Footer />
            </div>
        )
    } else if (result.length === 0) {
        return (
            <div className="search-container">
                <Title title="Search Results" description={`Search results for ${query}`} />
                <Header />
                <div className="search-body">
                    <div className="search-header">
                        <span className="search-text overflow">Search - {query}</span>
                        <Link to={Links.home}>
                            <div className="mouse">
                                <Icon icon="solar:arrow-left-line-duotone" />
                                <span className="search-text1">Back to Help Hub</span>
                                <span className="search-text2">
                                    <span className="search-text3">Back</span>
                                    <br></br>
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div style={{ width: "95%" }}>
                        <div className="search-bar">
                            <div className="searchBox">
                                <div className="searchInput">
                                    <div className="searchInputAndIcon">
                                        <img alt="" src={Assets.searchIcon} width={25} height={25} />
                                        <input
                                            type="text"
                                            placeholder="What do you need help with?"
                                            onChange={e => setQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="searchBtn" onClick={handleSearch}>
                                    <span>Search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "100px" }}></div>
                    <span className="search-text6">Search Results</span>
                    <div className="search-no-result">
                        <span className="search-text7">No result found</span>
                    </div>
                </div>
                <Footer />
            </div>
        )
    } else {
        return (
            <div className="search-container">
                <Helmet>
                    <title>Serch Help Hub | Search Results</title>
                    <meta name="description" content={`Search results for ${query}`} />
                    <meta property="og:title" content="Serch (Search Results) - Service made easy" />
                    <meta property="og:description" content={`Search results for ${query}`} />
                    <meta property="og:image" content={LinkAssets.logo} />
                </Helmet>
                <Header />
                <div className="search-body">
                    <div className="search-header">
                        <span className="search-text overflow">Search - {query}</span>
                        <Link to={Links.home}>
                            <div className="mouse">
                                <Icon icon="solar:arrow-left-line-duotone" />
                                <span className="search-text1">Back to Help Hub</span>
                                <span className="search-text2">
                                    <span className="search-text3">Back</span>
                                    <br></br>
                                </span>
                            </div>
                        </Link>
                    </div>
                    <div style={{ width: "95%" }}>
                        <div className="search-bar">
                            <div className="searchBox">
                                <div className="searchInput">
                                    <div className="searchInputAndIcon">
                                        <img alt="" src={Assets.searchIcon} width={25} height={25} />
                                        <input
                                            type="text"
                                            placeholder="What do you need help with?"
                                            onChange={e => setQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="searchBtn" onClick={handleSearch}>
                                    <span>Search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: "100px" }}></div>
                    <span className="search-text6">Search Results</span>
                    {result.map((value, key) => {
                        return (
                            <div key={key} style={{ width: "100%" }}>
                                <SearchResult
                                    image={value.image}
                                    header={value.question}
                                    category={value.category}
                                    link={value.link}
                                />
                                {key !== (result.length - 1) && (<Spacer height={"10px"} />)}
                            </div>
                        )
                    })}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Search
