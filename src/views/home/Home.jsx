import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useContentful } from 'react-contentful'
import Footer from '../../components/footer/Footer'
import './home.css'
import SearchBar from '../../components/search-bar/SearchBar'
import Shimmer from '../../components/shimmer/Shimmer'
import Header from '../../components/header/Header';
import ItemGenerator from '../../config/ItemGenerator';
import Title from '../../config/Title';

const Home = () => {
    const { data, error, fetched, loading } = useContentful({ contentType: 'serchHelpFaqCategory' });
    const [ categories, setCategories ] = useState([ ])

    useEffect(() => {
        if(data && data["items"].length > 0) {
            console.log(data["items"])
            const categories = data["items"].map((item) => ({
                image: item.fields.image,
                category: item.fields.category,
                order: item.fields.order,
                title: item.fields.title,
            }));
            categories.sort((a, b) => a.order - b.order);
            setCategories(categories)
        }
    }, [ data ]);

    if (loading || !fetched || error || !data || data["items"].length === 0) {
        return (
            <div className="home-container">
                <Title title="Home" description="Find the answer for your questions and queries" />
                <Header />
                <div className="home-body">
                    <div className="home-welcome">
                        <span className="home-text02">Welcome to Help Hub</span>
                        <span>Wait a moment while we fetch content for you...</span>
                        <div className="home-container2"></div>
                    </div>
                    <div className="home-categories-section">
                        <div className='home-search-view'>
                            <SearchBar placeholder={"Search questions, keywords and topics"}/>
                        </div>
                        <div className="home-categories">{ItemGenerator(length = 5).map((_, key) => {
                            return (<Shimmer key={ key } height={150} width={150}/>)
                        })}</div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    } else {
        return (
            <div className="home-container">
                <Title title="Home" description="Find the answer for your questions and queries" />
                <Header />
                <div className="home-body">
                    <div className="home-welcome">
                        <span className="home-text02">Welcome to Help Hub</span>
                        <span>What can we help you find today?</span>
                        <div className="home-container2"></div>
                    </div>
                    <div className="home-categories-section">
                        <div className='home-search-view'>
                            <SearchBar placeholder={"Search questions, keywords and topics"}/>
                        </div>
                        <div className="home-categories">{categories.map((category, key) => {
                            return (
                                <Link to={`/${ category.category }`} className="home-category-link" key={ key }>
                                    <div className="hover">
                                        <img src={ category.image } alt={ category.title } className='home-category-image'/>
                                        <span className="home-category-text">{ category.title }</span>
                                    </div>
                                </Link>
                            )
                        })}</div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Home