import React from 'react'
import Assets from '../../assets/Assets'
import DownloadApp from './DownloadApp'

const DownloadUserApp = () => {
    return (
        <DownloadApp
            image={ Assets.switchAccount }
            imageAlt='Serch User App'
            imageClassName='download-user-app-image'
            appleStore=''
            playstore=''
        />
    )
}

export default DownloadUserApp