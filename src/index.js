import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './style.css'
import './index.css'
import './not-found.css'
import reportWebVitals from './reportWebVitals';
import ScrollToTop from './api/ScrollToTop';
import Home from './views/home/Home';
import Links from './config/Links';
import Category from './views/category/Category';
import CategoryView from './views/category/CategoryView';
import Search from './views/search/Search';
import Error from './views/error/Error';
import { ContentfulClient, ContentfulProvider } from 'react-contentful'
import Section from './views/section/Section'
import SectionView from './views/section/SectionView'
import Help from './views/help/Help'
import { SnackbarProvider } from 'notistack'
import Keys from './api/Keys'

const App = () => {
    const contentfulClient = new ContentfulClient({
        accessToken: Keys.contentfulToken,
        space: Keys.contentfulSpace,
    });

    return (
        <>
            <SnackbarProvider
                maxSnack={2}
                iconVariant={{
                    success: '✅ ',
                    error: '✖️ ',
                    warning: '⚠️ ',
                    info: 'ℹ️ ',
                }}
            />
            <ContentfulProvider client={contentfulClient}>
                <Router>
                    <ScrollToTop>
                        <Routes>
                            <Route element={ <Error /> } path="*" />
                            <Route element={ <Home /> } exact path={ Links.home } />
                            <Route element={ <Search /> } path={ Links.search } />
                            <Route path={ Links.category } element={ <Category /> }>
                                <Route index element={ <CategoryView /> }/>
                                <Route path={ Links.section } element={ <Section /> }>
                                    <Route index element={ <SectionView /> }/>
                                    <Route path={ Links.faq } element={ <Help /> } />
                                </Route>
                            </Route>
                        </Routes>
                    </ScrollToTop>
                </Router>
            </ContentfulProvider>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <App />
);
reportWebVitals();