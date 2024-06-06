import { useEffect, useRef, useState } from "react";
import Assets from "../../assets/Assets";
import './search-bar.css';
import { useNavigate } from "react-router-dom";
import Links from "../../config/Links";
import SearchResult from "../search-result/SearchResult";
import Spacer from "../Spacer";
import { ContentfulClient } from "react-contentful";

const SearchBar = ({ placeholder }) => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const searchRef = useRef(null);
    const [result, setResult] = useState([ ])

    const handleSearch = () => {
        if (query === null || query === '') {
            return
        } else {
            navigate(`${Links.search}?q=${query}`)
        }
    }

    const client = new ContentfulClient({
        accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
        space: process.env.REACT_APP_CONTENTFUL_SPACE,
    });

    const search = async (query) => {
        setQuery(query);
        try {
            const entries = await client.getEntries({
                content_type: 'serchHelpFaqCategory',
                query: query
            });
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
            setResult([]);
        }
    }

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setResult([])
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="search-bar" ref={searchRef}>
            <div className="searchBox">
                <div className="searchInput">
                    <div className="searchInputAndIcon">
                        <img alt="" src={Assets.searchIcon} width={25} height={25} />
                        <input type="text" placeholder={placeholder} onChange={e => search(e.target.value)} />
                    </div>
                </div>
                <div className="searchBtn" onClick={handleSearch}>
                    <span>Search</span>
                </div>
            </div>
            {result.length !== 0 && (
                <div className="search-results" ref={searchRef}>
                    {
                        result.map((value, key) => {
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
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default SearchBar;