import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
    isShortFooter?: boolean;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isShortFooter, children }) => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                minHeight: '100vh',
                alignItems: 'center',
                flexDirection: 'column',
                overflow: "visible"
            }}
        >
            <Header />
            {children}
            <Footer isShort={isShortFooter} />
        </div>
    );
};

export default Layout;