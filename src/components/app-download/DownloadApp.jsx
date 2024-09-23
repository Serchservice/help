import React from 'react'
import './download-app.css'
import Assets from '../../assets/Assets'

const DownloadApp = ({
    appleStore = "",
    playstore = "",
    image = "",
    imageAlt = "",
    imageClassName = ""
}) => {
    return (
        <section className={"download-user-app-download-user-app"}>
            <main className="download-user-app-content">
                <header className="download-user-app-header">
                    <h2 className="download-user-app-heading section-heading">Log in/Get started for a personalized support</h2>
                    <div className="download-user-app-buttons">
                        <div className="download-user-app-ios button">
                            <img alt="apple-store" src={ Assets.appleIcon } className="download-user-app-icon"/>
                            <span className="download-user-app-text">Coming soon</span>
                        </div>
                        <div className="download-user-app-android button">
                            <img alt="play-store" src={ Assets.androidIcon } className="download-user-app-icon"/>
                            <span className="download-user-app-text">Coming soon</span>
                        </div>
                    </div>
                </header>
                <img alt={ imageAlt } src={ image } className={ imageClassName }/>
            </main>
        </section>
    )
}

export default DownloadApp