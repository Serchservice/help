import { IAppAsset, ILogoAsset } from "./Interfaces";

class AssetInstance {
    /**
     * Type: [Logo]
     */
    get logo(): ILogoAsset {
        return {
            squared: new URL('./logo/squared.png', import.meta.url).href,
            tagBlack: new URL('./logo/tagBlack.png', import.meta.url).href,
            tagWhite: new URL('./logo/tagWhite.png', import.meta.url).href,
            black: new URL('./logo/black.png', import.meta.url).href,
            white: new URL('./logo/white.png', import.meta.url).href,
        };
    }

    /**
     * Type: [APP DESIGN]
     */
    get app(): IAppAsset {
        return {
            user: new URL('./app/user.png', import.meta.url).href,
            provider: new URL('./app/provider.png', import.meta.url).href,
            business: new URL('./app/business.png', import.meta.url).href,
        };
    }

    /**
     * The Error Header Image
     */
    get error(): string {
        return new URL('./common/error.jpg', import.meta.url).href;
    }
}

const Asset = new AssetInstance();
export default Asset;