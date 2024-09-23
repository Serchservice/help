import { Icon } from "@iconify/react";
import { ContentlyBuilder, Help } from "@serchservice/contently";
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

export const HelpRoute: RouteInterface = {
    path: "/:category/:section/:group/:help",
    pathView: ({section = "", category = "", group = "", help = ""}) => `/${category}/${section}/${group}/${help}`,
    page: <HelpPage />
}

export default function HelpPage() {
    const { isMobile } = Uikit.useDesign();
    const { category, section, group, help } = useParams()
    const [activeHelp, setActiveHelp] = React.useState<Help>()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        async function fetch() {
            setIsLoading(true)
            const response = await contently.help.getHelp(category, section, group, help)
            setIsLoading(false)

            if(response) {
                setActiveHelp(response)
            }
        }

        fetch()
    }, [ category, section, group, help ])

    const titled: string = Uikit.Utility.capitalizeFirstLetter(help ?? group ?? section ?? "").replaceAll("-", " ").replaceAll("_", " ");
    const fixedCategory: string = category?.replaceAll("-", " ").replaceAll("_", " ") ?? ""

    const render = (): JSX.Element => {
        const links: ILinkedItem[] = [];

        if (category) {
            links.push({
                link: Routing.getRoute(Routing.instance.category, {category: category}),
                text: Uikit.Utility.capitalizeFirstLetter(category).replaceAll("-", " ").replaceAll("_", " "),
            });
        }

        if (section) {
            links.push({
                link: Routing.getRoute(Routing.instance.section, {category: category, section: section}),
                text: Uikit.Utility.capitalizeFirstLetter(section ?? "").replaceAll("-", " ").replaceAll("_", " "),
            });
        }

        if (group) {
            links.push({
                link: Routing.getRoute(Routing.instance.group, {category: category, section: section, group: group}),
                text: Uikit.Utility.capitalizeFirstLetter(group ?? "").replaceAll("-", " ").replaceAll("_", " "),
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
                    <Uikit.Shimmer height={40} width="100%" />
                    <Uikit.SizedBox height={15} />
                    <Uikit.Shimmer height={150} width="100%" />
                    <Uikit.SizedBox height={8} />
                    <Uikit.Shimmer height={150} width="100%" />
                    <Uikit.SizedBox height={8} />
                </React.Fragment>
            )
        } else if(activeHelp) {
            return (
                <React.Fragment>
                    <Uikit.SizedBox height={20} />
                    {activeHelp.answer && (<ContentlyBuilder content={activeHelp.answer} />)}
                </React.Fragment>
            )
        } else {
            return (<HelpNotFound />)
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

const HelpNotFound: React.FC = observer(() => {
    const { isMobile, isDesktop } = Uikit.useDesign();

    const information = [
        "Oops!! We couldn't find the help document you were looking for.",
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
                <Uikit.Padding symmetric={{horizontal: isMobile ? 0 : isDesktop ? 120 : 80}}>
                    <Uikit.Text
                        text={information.join(" ")}
                        size={isMobile ? 15 : 18}
                        color={Uikit.Theme.primary}
                        opacity={0.7}
                    />
                </Uikit.Padding>
            </Uikit.Center>
            <Uikit.SizedBox height={80} />
        </React.Fragment>
    )
})