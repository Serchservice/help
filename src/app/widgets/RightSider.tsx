import { Help, HelpCategory, HelpGroup, HelpSearchResponse, HelpSection } from "@serchservice/contently";
import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { contently } from "../../App";
import { LinkConfig } from "../../configuration/ButtonView";
import Routing from "../../configuration/Routing";
import { ModalProps } from "../../layout/Interfaces";

const RightSider: React.FC = observer(() => {
    const { isMobile } = Uikit.useDesign();
    const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false)

    const render = (): JSX.Element => {
        if(isMobile) {
            return (
                <Uikit.Column>
                    <Uikit.Text
                        text="Get the app for a personalized support"
                        color={Uikit.Theme.secondary}
                        size={isMobile ? 16 : 18}
                    />
                    <Uikit.SizedBox height={30} />
                    <Uikit.HoverLinkButton
                        value="Download"
                        link=""
                        fontSize="14px"
                        centered
                        backgroundColor={Uikit.Theme.primaryDark}
                    />
                </Uikit.Column>
            )
        } else {
            return (
                <Uikit.Row crossAxis="center">
                    <Uikit.Text
                        text="Get the app for a personalized support"
                        color={Uikit.Theme.secondary}
                        size={18}
                    />
                    <Uikit.SizedBox width={30} />
                    <Uikit.HoverLinkButton
                        value="Download"
                        link={LinkConfig.instance.download}
                        fontSize="14px"
                        centered
                        backgroundColor={Uikit.Theme.primaryDark}
                    />
                </Uikit.Row>
            )
        }
    }

    return (
        <React.Fragment>
            <Uikit.Container
                style={{cursor: "pointer"}}
                onClick={() => setIsSearchOpen(true)}
                borderRadius="20px"
                backgroundColor={Uikit.Theme.primaryLight}
                width="100%"
                height={55}
                padding="0 0 0 12px"
            >
                <Uikit.Row crossAxis="center">
                    <Uikit.Expanded>
                        <Uikit.Text text="Start typing..." color={Uikit.Theme.primary} size={16} opacity={0.6} />
                    </Uikit.Expanded>
                    <Uikit.Spacer />
                    <Uikit.Container borderRadius="0 20px 20px 0" backgroundColor={Uikit.Theme.primary} height={55} width="auto" padding="12px">
                        <Uikit.Column mainAxis="center" crossAxis="center" mainAxisSize="max">
                            <Uikit.Text text="Search" color={Uikit.Theme.secondary} size={14} align="center"/>
                        </Uikit.Column>
                    </Uikit.Container>
                </Uikit.Row>
            </Uikit.Container>
            <Uikit.SizedBox height={80} />
            <Uikit.Container backgroundColor={Uikit.Theme.primary} padding="24px" borderRadius="12px" width="100%">
                {render()}
            </Uikit.Container>
            <SearchBox isOpen={isSearchOpen} handleClose={() => setIsSearchOpen(false)} />
        </React.Fragment>
    )
})

export const SearchBox: React.FC<ModalProps> = observer(({ isOpen, handleClose}) => {
    const { isMobile } = Uikit.useDesign();
    const [isSearching, setIsSearching] = React.useState<boolean>(false)
    const [result, setResult] = React.useState<HelpSearchResponse[]>([])

    const handleSearch = async (query: string) => {
        setIsSearching(true);

        const response: HelpSearchResponse[] = await contently.help.handleSearch(query);
        setIsSearching(false)

        if(response) {
            setResult(response)
        }
    }

    const render = (): JSX.Element => {
        if(isSearching) {
            return (
                <React.Fragment>
                    <Uikit.SizedBox height={30} />
                    {Uikit.Utility.itemGenerate(5).map((_, index) => {
                        return (
                            <React.Fragment key={index} >
                                <Uikit.Shimmer height={60} width="100%" dimmed />
                                {Uikit.Utility.itemGenerate(5).length - 1 !== index && <Uikit.SizedBox height={10} />}
                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            )
        } else if(result.length > 0) {
            return (
                <React.Fragment>
                    <Uikit.SizedBox height={30} />
                    <SearchItem result={result} />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment></React.Fragment>
            )
        }
    }

    return (
        <Uikit.ActionDialog
            isOpen={isOpen}
            handleClose={handleClose}
            height="100vh"
            width="100%"
            header="Quick Search"
            color={Uikit.Theme.secondary}
            bgColor={Uikit.Theme.primary}
            fontSize={isMobile ? 24 : 30}
            mainStyles={{padding: isMobile ? "24px" : "48px"}}
            radius={0}
        >
            <Uikit.Column>
                <Uikit.Row crossAxis="center">
                    <Uikit.Expanded>
                        <Uikit.Field
                            height={isMobile ? 40 : 60}
                            fontSize={isMobile ? 16 : 32}
                            color={Uikit.Theme.secondary}
                            showBorder={false}
                            needLabel={false}
                            isRequired={false}
                            needSpacer={false}
                            onChange={e => handleSearch(e)}
                            placeHolder="What are looking for today?"
                        />
                    </Uikit.Expanded>
                </Uikit.Row>
                {render()}
            </Uikit.Column>
        </Uikit.ActionDialog>
    )
})

interface SearchItemProps {
    result: HelpSearchResponse[]
}

const SearchItem: React.FC<SearchItemProps> = observer(({ result }) => {
    const shuffledList = result.sort(() => Math.random() - 0.5);

    /** Category Help Response */
    const renderCategory = (category: HelpCategory): JSX.Element => {
        return (
            <SearchLink
                header={category.title}
                description={category.category}
                link={Routing.getRoute(Routing.instance.category, {category: category.category})}
                image={category.image}
                type="category"
            />
        )
    }

    /** Section Help Response */
    const renderSection = (section: HelpSection): JSX.Element | undefined => {
        if(section.link && section.link !== "") {
            return (
                <SearchLink
                    header={section.title}
                    description={section.section}
                    link={`/${section?.link}`}
                    linkifiers={section?.link.split("/")}
                    type="section"
                />
            )
        }
    }

    /** Group Help Response */
    const renderGroup = (group: HelpGroup): JSX.Element | undefined => {
        if(group.link && group.link !== "") {
            return (
                <SearchLink
                    header={group.title}
                    description={group.group}
                    link={`/${group?.link}`}
                    linkifiers={group?.link.split("/")}
                    type="group"
                />
            )
        }
    }

    /** Faq Help Response */
    const renderFaq = (faq: Help): JSX.Element | undefined => {
        if(faq.link && faq.link !== "") {
            return (
                <SearchLink
                    header={faq.title}
                    description={faq.faq}
                    link={`/${faq?.link}`}
                    linkifiers={faq?.link.split("/")}
                    type="group"
                />
            )
        }
    }

    const render = (item: HelpSearchResponse): JSX.Element | undefined => {
        if(item instanceof HelpCategory) {
            return renderCategory(item)
        } else if(item instanceof HelpSection) {
            return renderSection(item)
        } else if(item instanceof HelpGroup) {
            return renderGroup(item)
        } else {
            return renderFaq(item as Help)
        }
    }

    return (
        <React.Fragment>
            {shuffledList.filter(item => item.title).map((item, index) => {
                const div = render(item)

                return (
                    <React.Fragment key={index}>
                        {div}
                        {(shuffledList.length - 1 !== index && div) && (<Uikit.SizedBox height={15} />)}
                    </React.Fragment>
                )
            })}
        </React.Fragment>
    )
})

interface SearchLinkProps {
    header: string;
    description: string;
    linkifiers?: string[];
    image?: string;
    link: string;
    type: 'category' | 'section' | 'group' | 'faq';
}

const SearchLink: React.FC<SearchLinkProps> = observer(({header, description, linkifiers, link, image, type}) => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);

    const handleHover = (value: boolean) => {
        setIsHovered(value);
    };

    const bgHoverColor = () => isHovered ? Uikit.Theme.appbarDark : "transparent"
    const txtHoverColor = () => isHovered ? Uikit.Theme.appbarLight : Uikit.Theme.secondary
    const txtHoverOpacity = () => isHovered ? 0.6 : 1

    const buttonStyle = {
        borderRadius: isHovered ? "12px" : "0",
        backgroundColor: bgHoverColor(),
        display: 'inline-block',
        padding: isHovered ? '10px' : '8px',
        cursor: 'pointer',
        alignSelf: "center",
        width: "100%",
        transition: 'background-color 0.3s, color 0.3s',
    };

    const clear = (s: string) => {
        return s.replaceAll("-", " ").replaceAll("_", " ");
    }

    if(type === 'category') {
        return (
            <Link to={link} style={buttonStyle} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                <Uikit.Column crossAxis="flex-start">
                    <Uikit.Row crossAxis="center">
                        {image && (<Uikit.Image image={image} height={15} width={15} style={{borderRadius: "16px"}} />)}
                        {image && (<Uikit.SizedBox width={5} />)}
                        <Uikit.Expanded>
                            <Uikit.Text text={header} color={txtHoverColor()} size={16} opacity={txtHoverOpacity()} />
                        </Uikit.Expanded>
                    </Uikit.Row>
                    <Uikit.SizedBox height={10} />
                    <Uikit.Text
                        text={`Explore questions and answers in ${ clear(description) }`}
                        color={txtHoverColor()}
                        size={13}
                        opacity={txtHoverOpacity()}
                    />
                </Uikit.Column>
            </Link>
        )
    } else if(type === 'section') {
        const cap = Uikit.Utility.capitalizeFirstLetter(clear(linkifiers![0] ?? ""))

        return (
            <Link to={link} style={buttonStyle} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                <Uikit.Column crossAxis="flex-start">
                    <Uikit.Text text={header} color={txtHoverColor()} size={16} opacity={txtHoverOpacity()} />
                    <Uikit.SizedBox height={10} />
                    <Uikit.Row crossAxis="center">
                        {image && (<Uikit.Image image={image} height={15} width={15} style={{borderRadius: "16px"}} />)}
                        {image && (<Uikit.SizedBox width={5} />)}
                        <Uikit.Expanded>
                            <Uikit.Text text={cap} color={txtHoverColor()} size={13} opacity={txtHoverOpacity()} />
                        </Uikit.Expanded>
                    </Uikit.Row>
                    <Uikit.SizedBox height={10} />
                    <Uikit.Text
                        text={`${cap} - ${Uikit.Utility.capitalizeFirstLetter(clear(description))}`}
                        color={txtHoverColor()}
                        size={14.5}
                        opacity={txtHoverOpacity()}
                    />
                </Uikit.Column>
            </Link>
        )
    } else {
        const cap = Uikit.Utility.capitalizeFirstLetter(clear(linkifiers![0] ?? ""))

        return (
            <Link to={link} style={buttonStyle} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                <Uikit.Column crossAxis="flex-start">
                    <Uikit.Text text={header} color={txtHoverColor()} size={16} opacity={txtHoverOpacity()} />
                    <Uikit.SizedBox height={10} />
                    <Uikit.Row crossAxis="center">
                        {image && (<Uikit.Image image={image} height={15} width={15} style={{borderRadius: "16px"}} />)}
                        {image && (<Uikit.SizedBox width={5} />)}
                        {linkifiers && (
                            <Uikit.Expanded>
                                <Uikit.Wrap runSpacing={20} spacing={5}>
                                    {linkifiers.map((item, index) => {
                                        return (
                                            <Uikit.Row mainAxisSize="min" crossAxisSize="min" crossAxis="center" key={index}>
                                                <Uikit.Text
                                                    text={Uikit.Utility.capitalizeFirstLetter(clear(item))}
                                                    color={txtHoverColor()}
                                                    size={13}
                                                    opacity={txtHoverOpacity()}
                                                />
                                                {linkifiers.length - 1 !== index && (<Uikit.SizedBox width={5} />)}
                                                {linkifiers.length - 1 !== index && (
                                                    <Uikit.Text
                                                        text="|"
                                                        color={txtHoverColor()}
                                                        size={13}
                                                        opacity={txtHoverOpacity()}
                                                    />
                                                )}
                                            </Uikit.Row>
                                        )
                                    })}
                                </Uikit.Wrap>
                            </Uikit.Expanded>
                        )}
                    </Uikit.Row>
                    <Uikit.SizedBox height={10} />
                    <Uikit.Text
                        text={`${cap} - ${Uikit.Utility.capitalizeFirstLetter(clear(description))}`}
                        color={txtHoverColor()}
                        size={14.5}
                        opacity={txtHoverOpacity()}
                    />
                </Uikit.Column>
            </Link>
        )
    }
});

export default RightSider;