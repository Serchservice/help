class Keys {
    /// BASE URL SERCH SERVER
    static BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

    /// Contentful Space Token
    static CONTENTFUL_TOKEN = import.meta.env.VITE_CONTENTFUL_TOKEN ?? "";

    /// Contentful Space Id
    static CONTENTFUL_SPACE = import.meta.env.VITE_CONTENTFUL_SPACE ?? "";

    /// LOCATION IP URL
    static IP_URL = 'https://api.ipify.org?format=json';
}

export default Keys;