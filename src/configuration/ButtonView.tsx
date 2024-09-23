import { faLinkedin, faInstagram, faTwitter, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { ButtonView, ParentButtonView } from '@serchservice/web-ui-kit';

// Singleton Class LinkConfig
class LinkConfig {
    private static _instance: LinkConfig = new LinkConfig();

    // Private constructor
    private constructor() { }

    // Singleton instance
    public static get instance(): LinkConfig {
        return this._instance;
    }

    // FOOTER QUICK LINKS
    get footer(): ParentButtonView[] {
        return footerLinks;
    }

    // SOCIAL QUICK LINKS
    get social(): ButtonView[] {
        return socialMediaLinks;
    }

    // LEGAL QUICK LINKS
    get legal(): ButtonView[] {
        return quickLegalLinks;
    }

    // ERROR QUICK LINKS
    get error(): ButtonView[] {
        return errorLinks;
    }

    // Safe-Guard Community LINK
    get sgc(): string {
        return "";
    }

    // SERCHSERVICE HOME LINK
    get serch(): string {
        return buildSerchWeb("/");
    }

    /// SERCHSERVICE SUPPORT
    get support(): string {
        return buildSerchWeb("/hub/support");
    }

    // DOWNLOAD LINK
    get download(): string {
        return buildSerchWeb("/platform");
    }
}

// Function to build URLs
function buildSerchWeb(endpoint: string): string {
    return `https://www.serchservice.com${endpoint}`;
}

// FOOTER QUICK LINKS
const footerLinks: ParentButtonView[] = [
    {
        section: "Company",
        views: [
            { path: buildSerchWeb("/about"), header: "About Us" },
            { path: buildSerchWeb("/blogs"), header: "Blog" },
            { path: buildSerchWeb("/newsroom"), header: "Newsroom" },
            { path: buildSerchWeb("/marketplace"), header: "Marketplace" },
            { path: buildSerchWeb("/career"), header: "Career" },
        ],
    },
    {
        section: "Product",
        views: [
            { path: buildSerchWeb("/user"), header: "For Users" },
            { path: buildSerchWeb("/provider"), header: "For Providers" },
            { path: buildSerchWeb("/business"), header: "For Businesses" },
            { path: buildSerchWeb("/guest"), header: "For Guests" },
            { path: buildSerchWeb("/platform"), header: "Download" },
        ],
    },
    {
        section: "Explore",
        views: [
            { path: buildSerchWeb("/aisi"), header: "AISI" },
            { path: buildSerchWeb("/reserve"), header: "Reserve" },
            { path: buildSerchWeb("/sharing"), header: "Sharing" },
            { path: buildSerchWeb("/tip2fix"), header: "Tip2Fix" },
            { path: buildSerchWeb("/drive"), header: "Drive" },
        ],
    },
    {
        section: "Information",
        views: [
            { path: buildSerchWeb("/safety-guidelines"), header: "Safety Guidelines" },
            { path: buildSerchWeb("/countries-in-serch"), header: "Countries In Serch" },
        ],
    },
    {
        section: "Support",
        views: [
            { path: buildSerchWeb("/hub/speak-with-serch"), header: "Speak With Serch" },
            { path: buildSerchWeb("/hub/legal"), header: "Legal Hub" },
            { path: buildSerchWeb("/hub/support"), header: "Support Hub" },
        ],
    },
];

// SOCIAL QUICK LINKS
const socialMediaLinks: ButtonView[] = [
    { header: "LinkedIn", icon: faLinkedin, path: "https://www.linkedin.com/company/serchservice", index: 0 },
    { header: "Instagram", icon: faInstagram, path: "https://www.instagram.com/serchservice", index: 1 },
    { header: "X", icon: faTwitter, path: "https://www.x.com/serchservice", index: 2 },
    { header: "YouTube", icon: faYoutube, path: "https://www.youtube.com/@serchservice", index: 3 },
    { header: "TikTok", icon: faTiktok, path: "https://www.tiktok.com/@serchservice", index: 4 },
];

// LEGAL QUICK LINKS
const quickLegalLinks: ButtonView[] = [
    { path: buildSerchWeb("/hub/legal/terms-and-conditions"), header: "Terms and conditions" },
    { path: buildSerchWeb("/hub/legal/accessibility"), header: "Accessibility" },
    { path: buildSerchWeb("/hub/legal/privacy-policy"), header: "Privacy" },
];

// ERROR QUICK LINKS
const errorLinks: ButtonView[] = [
    { path: buildSerchWeb("/"), header: "Head to serchservice.com" },
    { path: buildSerchWeb("/career"), header: "Head to career" },
    { path: buildSerchWeb("/business"), header: "Head to Serch Business" },
    { path: buildSerchWeb("/countries-in-serch"), header: "See countries in Serch" },
    { path: buildSerchWeb("/how-it-works/providing"), header: "Understand how to flex your providing skills" },
    { path: buildSerchWeb("/how-it-works/requesting"), header: "See how requesting works" },
];

export { LinkConfig };
