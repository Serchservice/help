import { IAppAsset, ILogoAsset } from "./Interfaces";

class AssetInstance {
    /**
     * Type: [Logo]
     */
    get logo(): ILogoAsset {
        return {
            squared: require("./logo/squared.png"),
            tagBlack: require("./logo/tagBlack.png"),
            tagWhite: require("./logo/tagWhite.png"),
            black: require("./logo/black.png"),
            white: require("./logo/white.png"),
        }
    }

    /**
     * Type: [APP DESIGN]
     */
    get app(): IAppAsset {
        return {
            user: require("./app/user.png"),
            provider: require("./app/provider.png"),
            business: require("./app/business.png"),
        }
    }

    /**
     * The Error Header Image
     */
    get error(): string {
        return require('./common/error.jpg')
    }
}

const require = (image: string) => {
    return new URL(image, import.meta.url).href
}

const Asset = new AssetInstance();
export default Asset;