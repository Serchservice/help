import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentful } from 'react-contentful'
import './help.css';
import Shimmer from "../../components/shimmer/Shimmer";
import Spacer from "../../components/Spacer";
import ItemGenerator from "../../config/ItemGenerator";
import LinkAssets from "../../assets/LinkAssets";
import Links from "../../config/Links";
import ContentRender from "../../components/contentful/ContentRender";
import Utils from "../../utils/Utils";
import Title from "../../config/Title";

const Help = () => {
    const { category, section, group, faq } = useParams()
    const [content, setContent] = useState()

    const { data, error, fetched, loading } = useContentful({ contentType: 'serchHelpFaqCategory' });
    useEffect(() => {
        if (data && data["items"].length > 0) {
            const categories = data["items"].map((item) => ({
                image: item.fields.image,
                category: item.fields.category,
                order: item.fields.order,
                title: item.fields.title,
                sections: item.fields.sections && item.fields.sections.map((s) => ({
                    title: s.fields.title,
                    section: s.fields.section,
                    groups: s.fields.groups && s.fields.groups.map((g) => ({
                        title: g.fields.title,
                        group: g.fields.group,
                        faqs: g.fields.faqs && g.fields.faqs.map((f) => ({
                            title: f.fields.title,
                            faq: f.fields.faq,
                            answer: f.fields.answer,
                        }))
                    }))
                }))
            }));
            categories.sort((a, b) => a.order - b.order);
            const activeCategory = categories.find((c) => c.category === category);
            if (activeCategory && activeCategory.sections && activeCategory.sections.length > 0) {
                const activeSection = activeCategory.sections.find((s) => s.section === section);
                if (activeSection && activeSection.groups && activeSection.groups.length > 0) {
                    const activeGroup = activeSection.groups.find((g) => g.group === group);
                    if (activeGroup && activeGroup.faqs && activeGroup.faqs.length > 0) {
                        const activeFaq = activeGroup.faqs.find((f) => f.faq === faq);
                        setContent(activeFaq.answer);
                    }
                }
            }
        }
    }, [data, category]);

    if (loading || !fetched) {
        return (
            <div style={{ width: "100%" }}>
                <Shimmer height={40} percentWidth="85%" />
                <Spacer height={"15px"} />
                <Shimmer height={40} percentWidth="60%" />
                <Spacer height={"60px"} />
                {
                    ItemGenerator({ length: 10 }).map((_, key) => {
                        return (
                            <div key={key}>
                                <Shimmer height={18} percentWidth="100%" />
                                <Spacer height={"8px"} />
                            </div>
                        )
                    })
                }
            </div>
        )
    } else if (error || !data || data["items"].length === 0 || content === undefined) {
        return (
            <div style={{ width: "100%" }}>
                <img alt="Error" src={LinkAssets.error} className="error-image" />
                <div className="error-body">
                    <h1 className="error-text">An error occurred while trying to find the support you were looking for</h1>
                    <Link to={Links.home} className="error-navlink">
                        <div data-role="accordion-container" className="error-element accordion-element">
                            <div className="error-details">
                                <span className="error-text1"> Head to home </span>
                            </div>
                            <svg viewBox="0 0 1024 1024" data-role="accordion-icon" className="error-icon">
                                <path d="M366 708l196-196-196-196 60-60 256 256-256 256z"></path>
                            </svg>
                        </div>
                    </Link>
                </div>
                <div style={{ height: "100px" }}></div>
            </div>
        )
    } else if (content === null) {
        return <div style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flex: "1 1",
            justifyContent: "center",
            width: "100%"
        }}>No content yet</div>
    } else {
        return (
            <>
                <Title title={ Utils.capitalizeFirstLetter(faq) } description={`Explore question and answers in ${ faq }`} />
                <div className="help-content-body">
                    <ContentRender content={content} />
                </div>
            </>
        )
    }
}

export default Help;