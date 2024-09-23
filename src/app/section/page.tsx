import { Icon } from "@iconify/react";
import { HelpGroup, HelpSection } from "@serchservice/contently";
import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";
import { contently } from "../../App";
import Linked, { ILinkedItem } from "../../app/widgets/Linked";
import RightSider from "../../app/widgets/RightSider";
import Title from "../../app/widgets/Title";
import { RouteInterface } from "../../configuration/Route";
import Routing from "../../configuration/Routing";

export const SectionRoute: RouteInterface = {
    path: "/:category/:section",
    pathView: ({section = "", category = ""}) => `/${category}/${section}`,
    page: <SectionPage />
}

export default function SectionPage() {
    const { isMobile } = Uikit.useDesign();
    const { category, section } = useParams()
    const [activeSection, setActiveSection] = React.useState<HelpSection>()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        async function fetch() {
            setIsLoading(true);
            const response = await contently.help.getSection(category, section);
            setIsLoading(false);

            if (response) {
                setActiveSection(response);
            }
        }

        fetch();
    }, [ category, section ]);

    const titled: string = Uikit.Utility.capitalizeFirstLetter(section ?? "").replaceAll("-", " ").replaceAll("_", " ");
    const fixedCategory: string = category?.replaceAll("-", " ").replaceAll("_", " ") ?? ""

    const render = (): JSX.Element => {
        const links: ILinkedItem[] = [];

        if (category) {
            links.push({
                link: Routing.getRoute(Routing.instance.category, {category: category}),
                text: Uikit.Utility.capitalizeFirstLetter(category).replaceAll("-", " ").replaceAll("_", " "),
            });
        }

        return (
            <React.Fragment>
                <Linked links={links} />
                {renderView()}
            </React.Fragment>
        )
    }

    const renderView = (): JSX.Element => {
        if(isLoading) {
            return (
                <React.Fragment>
                    <Uikit.SizedBox height={20} />
                    {Uikit.Utility.itemGenerate(5).map((_, index) => {
                        return (
                            <React.Fragment key={index} >
                                <Uikit.Shimmer height={50} width="100%" />
                                {Uikit.Utility.itemGenerate(5).length - 1 !== index && <Uikit.SizedBox height={10} />}
                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            )
        } else if(activeSection && activeSection.groups.length > 0) {
            return (
                <React.Fragment>
                    <Uikit.SizedBox height={20} />
                    {activeSection.groups.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Section group={item} />
                                {activeSection.groups.length - 1 !== index && <Uikit.SizedBox height={10} />}
                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            )
        } else {
            return (<SectionNotFound />)
        }
    }

    return (
        <React.Fragment>
            <Title
                title={titled}
                description={`${Uikit.Utility.capitalizeFirstLetter(fixedCategory)} - ${titled}`}
            />
            <Uikit.Container backgroundColor={Uikit.Theme.secondary} padding={isMobile ? "24px" : "32px"} width="100%">
                <Uikit.Column>
                    <Uikit.Responsive
                        desktop={
                            <Uikit.Row crossAxis="flex-start">
                                <Uikit.Container width="60%">{render()}</Uikit.Container>
                                <Uikit.SizedBox width={30} />
                                <Uikit.Container width="40%"><RightSider /></Uikit.Container>
                            </Uikit.Row>
                        }
                        phone={
                            <Uikit.Column>
                                <Uikit.Container width="100%"><RightSider /></Uikit.Container>
                                <Uikit.SizedBox height={30} />
                                <Uikit.Container width="100%">{render()}</Uikit.Container>
                            </Uikit.Column>
                        }
                    />
                </Uikit.Column>
            </Uikit.Container>
        </React.Fragment>
    )
}

interface SectionProps {
    group: HelpGroup;
}

const Section: React.FC<SectionProps> = observer(({ group }) => {
    const { category, section } = useParams()
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [elevation, setElevation] = React.useState<number>(2)

    const handleClick = () => setIsOpen(!isOpen)

    return (
        <Uikit.Container
            width="100%"
            height={isOpen ? "auto" : "55px"}
            onHover={value => value  ? setElevation(4) : setElevation(2)}
            padding="18px"
            borderRadius="16px"
            elevation={elevation}
            style={{transition: "0.7s"}}
        >
            <Uikit.Row crossAxis="center" style={{cursor: "pointer"}} onClick={handleClick}>
                <Uikit.Expanded>
                    <Uikit.Text text={group.title} size={15} color={Uikit.Theme.primary} weight="bold" />
                </Uikit.Expanded>
                <Uikit.SizedBox width={30} />
                <Uikit.ArrowButton onClick={handleClick} isUp={isOpen} color={Uikit.Theme.primary} />
            </Uikit.Row>
            <Uikit.SizedBox height={20} />
            {(group.faqs.length > 0 && isOpen) && group.faqs.map((faq, index) => {
                return (
                    <Uikit.Step
                        content={
                            <Uikit.UnderlinedButton
                                text={faq.title}
                                link={Routing.getRoute(Routing.instance.help, {
                                    category: category,
                                    section: section,
                                    help: faq.faq,
                                    group: group.group
                                })}
                                styles={{ width: "auto" }}
                            />
                        }
                        color={Uikit.Theme.primary}
                        key={index}
                        showBottom={group.faqs.length - 1 !== index}
                    />
                )
            })}
        </Uikit.Container>
    )
})

const SectionNotFound: React.FC = observer(() => {
    const width = Uikit.useWidth();

    const information = [
        "Oops!! We couldn't find the section you were looking for.",
        "This might have been removed or didn't exist at all in our library."
    ]

    return (
        <React.Fragment>
            <Uikit.SizedBox height={60} />
            <Uikit.Center>
                <Icon icon="ic:twotone-error" width="120px" height="120px" color={Uikit.Theme.appbarDark} opacity={0.5} />
            </Uikit.Center>
            <Uikit.SizedBox height={30} />
            <Uikit.Center>
                <Uikit.Padding symmetric={{horizontal: Uikit.Utility.isMobile(width) ? 0 : Uikit.Utility.isDesktop(width) ? 120 : 80}}>
                    <Uikit.Text
                        text={information.join(" ")}
                        size={Uikit.Utility.isMobile(width) ? 15 : 18}
                        color={Uikit.Theme.primary}
                        opacity={0.7}
                    />
                </Uikit.Padding>
            </Uikit.Center>
            <Uikit.SizedBox height={80} />
        </React.Fragment>
    )
})