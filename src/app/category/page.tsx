import { Icon } from "@iconify/react";
import { HelpCategory } from "@serchservice/contently";
import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";
import { contently } from "../../App";
import Linked from "../../app/widgets/Linked";
import RightSider from "../../app/widgets/RightSider";
import Title from "../../app/widgets/Title";
import Routing from "../../configuration/Routing";
import { RouteInterface } from "../../configuration/Route";

export const CategoryRoute: RouteInterface = {
    path: "/:category",
    pathView: ({category = ""}) => `/${category}`,
    page: <CategoryPage />
}

export default function CategoryPage() {
    const { isMobile } = Uikit.useDesign();
    const { category } = useParams()
    const [activeCategory, setActiveCategory] = React.useState<HelpCategory>()
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        async function fetch() {
            setIsLoading(true)
            const response = await contently.help.getCategory(category)
            setIsLoading(false)

            if(response) {
                setActiveCategory(response)
            }
        }

        fetch()
    }, [ category ])

    const render = (): JSX.Element => {
        return (
            <React.Fragment>
                <Linked links={[]} />
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
        } else if(activeCategory && activeCategory.sections.length > 0) {
            return (
                <React.Fragment>
                    <Uikit.SizedBox height={20} />
                    {activeCategory.sections.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Uikit.HoverLinkButton
                                    value={item.title}
                                    link={Routing.getRoute(Routing.instance.section, {category: category, section: item.section})}
                                    fontSize="15px"
                                    color={Uikit.Theme.primary}
                                    backgroundColor={Uikit.Theme.appbarLight}
                                />
                                {activeCategory.sections.length - 1 !== index && <Uikit.SizedBox height={10} />}
                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            )
        } else {
            return (<CategoryNotFound />)
        }
    }

    const fixedCategory: string = category?.replaceAll("-", " ").replaceAll("_", " ") ?? ""

    return (
        <React.Fragment>
            <Title
                title={Uikit.Utility.capitalizeFirstLetter(fixedCategory)}
                description={`Explore questions and answers in ${ fixedCategory }`}
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

const CategoryNotFound: React.FC = observer(() => {
    const width = Uikit.useWidth();

    const information = [
        "Oops!! We couldn't find the category you were looking for.",
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