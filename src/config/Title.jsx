import { Helmet } from "react-helmet"
import LinkAssets from "../assets/LinkAssets"

const Title = ({
    title = "",
    description = "",
    image = "",
    isBlog = false,
    url = "https://www.serchservice.com",
    keywords = []
}) => {
    const ogTitle = `Serch Help Hub | ${title}`
    const contentType = isBlog ? "article" : "website"
    const contentKeywords = [
        "serch", "Serch", "serchservice",
        "Serchservice", "Service made easy", "artisans",
        "mechanics", "plumbers", "electricians", "carpenters",
        "service providers", "requestSharing", "provideSharing",
        "share", "home services", "help", "docs", "documentation"
    ]
    const allKeywords = Array.from(new Set([...contentKeywords, ...keywords])).join(", ");

    return (
        <Helmet>
            <title>{ogTitle}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Serch Team" />
            <link rel="author" href="https://www.serchservice.com/leadership" />
            <meta name="keywords" content={allKeywords} />
            <meta name="creator" content="Team Serch" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />
            <meta name="classification" content="RequestSharing and ProvideSharing" />
            <meta name="category" content="RequestSharing and ProvideSharing" />
            <link rel="assets" href="https://www.serchservice.com/media-and-assets" />
            <link rel="icon" href="/favicon.png" type="icon/png" sizes="32x32" />
            <link rel="apple-touch-icon" href="/favicon.png" type="icon/png" sizes="32x32" />

            {/* <meta property="al:ios:app_store_id" content="123456789" />
            <meta property="al:ios:url" content="https://example.com" />
            <meta property="al:android:package" content="com.example" />
            <meta property="al:android:url" content="https://example.com" /> */}

            /// Open Graph
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image ?? LinkAssets.logo} />
            <meta property="og:type" content={contentType} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Serch" />

            /// Twitter
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@serchservice" />
            <meta name="twitter:creator" content="@serchservice" />
            <meta name="twitter:title" content="Serchservice | Service made easy" />
            <meta name="twitter:description" content="Making it easy to access service providers at all times" />
            <meta name="twitter:image" content={LinkAssets.logo} />
        </Helmet>
    )
}

export default Title