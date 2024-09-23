import { HelpCategory } from "@serchservice/contently";
import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { contently } from "../App";
import HelpDb from "../backend/database/HelpDb";
import { RouteInterface } from "../configuration/Route";
import Routing from "../configuration/Routing";
import { SearchBox } from "./widgets/RightSider";
import Title from "./widgets/Title";

export const HomeRoute: RouteInterface = {
    path: "/",
    page: <HomePage />
}

export default function HomePage() {
    return (
        <React.Fragment>
            <Title title="Help Hub" description="Support when you need it" />
            <HomePageHeader />
        </React.Fragment>
    )
}

const HomePageHeader = observer((): JSX.Element => {
    const width = Uikit.useWidth();
    const [isLoading, setIsLoading] = React.useState<boolean>(HelpDb.read.length === 0)
    const [categories, setCategories] = React.useState<HelpCategory[]>([])

    /// DEFINITIONS
    const { isMobile } = Uikit.useDesign();
    const margin = isMobile ? "0 12px" : "0 24px";

    React.useEffect(() => {
        setIsLoading(true)

        if(HelpDb.read.length > 0) {
            setIsLoading(false)
            const categories = HelpDb.read;
            setCategories(categories.sort((a, b) => a.order - b.order))
        }

        async function fetch() {
            setIsLoading(true)
            const response: HelpCategory[] = await contently.help.getAllCategories()
            setIsLoading(false)

            if(response) {
                setCategories(response)
                HelpDb.set(response)
            }
        }

        fetch()
    }, [ ])

    const renderContent = (): JSX.Element => {
        if(isLoading) {
            return (
                <Uikit.Positioned top={isMobile ? 300 : 330} left={0} right={0}>
                    <Uikit.Container backgroundColor={Uikit.Theme.secondary} padding="20px" margin={margin}>
                        <Uikit.Wrap runSpacing={10} spacing={20} crossAxisAlignment="center">
                            {Uikit.Utility.itemGenerate(6).map((_, index) => {
                                return (<Uikit.Shimmer key={index} height={150} width={150} />)
                            })}
                        </Uikit.Wrap>
                    </Uikit.Container>
                </Uikit.Positioned>
            )
        } else if(categories.length > 0) {
            return (
                <Uikit.Positioned top={isMobile ? 300 : 330} left={0} right={0}>
                    <Uikit.Container backgroundColor={Uikit.Theme.secondary} padding="20px" margin={margin}>
                        <Uikit.Text text="Quick Links" color={Uikit.Theme.primary} size={isMobile ? 18 : 22} weight='bold' />
                        <Uikit.SizedBox height={30} />
                        <Uikit.Wrap runSpacing={30} spacing={20} crossAxisAlignment="flex-start">
                            {categories.map((category, index) => {
                                return (
                                    <Link to={Routing.getRoute(Routing.instance.category, {category: category.category})} key={index}>
                                        <Uikit.Container width='auto' height='auto' padding="12px 24px" boxShadow="0px 0px 110px -29px rgba(138,138,138,1)">
                                            <Uikit.Column crossAxis="center">
                                                <Uikit.Image image={category.image} width={isMobile ? 60 : 90} />
                                                <Uikit.SizedBox height={5} />
                                                <Uikit.Text text={category.title} color={Uikit.Theme.primary} size={15} />
                                            </Uikit.Column>
                                        </Uikit.Container>
                                    </Link>
                                )
                            })}
                        </Uikit.Wrap>
                    </Uikit.Container>
                </Uikit.Positioned>
            )
        } else {
            return (<></>)
        }
    }

    return (
        <Uikit.Stack height="1000px">
            <HomePageSearchBox width={width} />
            {renderContent()}
        </Uikit.Stack>
    )
})

interface HomePageSearchBoxProps {
    width: number;
}

const HomePageSearchBox: React.FC<HomePageSearchBoxProps> = observer(({ width }) => {
    /// DEFINITIONS
    const isMobile = Uikit.Utility.isMobile(width);
    const padding = isMobile ? "72px 22px" : "100px 62px";
    const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false)

    return (
        <React.Fragment>
            <Uikit.Container backgroundColor={Uikit.Theme.primary} width="100%" padding={padding} boxShadow="0px 115px 110px 17px rgba(173,173,173,1)">
                <Uikit.Column crossAxis="center">
                    <Uikit.Text text="Welcome to Help Hub" weight='bold' size={isMobile ? 18 : 22} color={Uikit.Theme.secondary} />
                    <Uikit.SizedBox height={10} />
                    <Uikit.Text text="Giving you support when you need it" size={15} color={Uikit.Theme.secondary} />
                    <Uikit.SizedBox height={60} />
                    <Uikit.Container backgroundColor="#292929" padding="12px" borderRadius="50px" width="100%">
                        <Uikit.Row crossAxis="center">
                            <Uikit.Expanded>
                                <Uikit.Field
                                    height={isMobile ? 40 : 60}
                                    fontSize={isMobile ? 16 : 24}
                                    color={Uikit.Theme.secondary}
                                    showBorder={false}
                                    needLabel={false}
                                    isRequired={false}
                                    // isDisabled
                                    needSpacer={false}
                                    onClick={() => setIsSearchOpen(true)}
                                    placeHolder="What are looking for today?"
                                />
                            </Uikit.Expanded>
                        </Uikit.Row>
                    </Uikit.Container>
                </Uikit.Column>
            </Uikit.Container>
            <SearchBox isOpen={isSearchOpen} handleClose={() => setIsSearchOpen(false)} />
        </React.Fragment>
    )
})