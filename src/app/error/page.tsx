import * as Uikit from "@serchservice/web-ui-kit";
import Title from "../../app/widgets/Title";
import Asset from "../../assets/Asset";
import { LinkConfig } from "../../configuration/ButtonView";
import { RouteInterface } from "../../configuration/Route";
import Layout from "../../layout/Layout";

export const PageNotFoundRoute: RouteInterface = {
    path: "*",
    page: <PageNotFoundPage />
}

export default function PageNotFoundPage() {
    const width = Uikit.useWidth();
    const { isMobile } = Uikit.useDesign();

    return (
        <Layout isShortFooter>
            <Title title="Page not found" description="The page you were looking for was not found" />
            <Uikit.Image image={Asset.error} width={width} />
            <Uikit.SizedBox height={50} />
            <Uikit.Padding all={24}>
                <Uikit.Text
                    text="Sorry, we couldn't find the page you were looking for. Try re-entering the address, or choose one of the options below."
                    size={isMobile ? 20 : 28}
                    weight='bold'
                />
                <Uikit.SizedBox height={50} />
                {LinkConfig.instance.error.map((view, index) => {
                    var isLast: boolean = LinkConfig.instance.error[LinkConfig.instance.error.length - 1] === view

                    return (
                        <Uikit.Padding key={index} only={{ bottom: isLast ? 0 : 20 }}>
                            <Uikit.UnderlinedButton
                                text={view.header!}
                                textColor={Uikit.Theme.primary}
                                textSize={isMobile ? 14 : 18}
                                iconSize={2}
                                link={view.path}
                                showLine
                                withArrow
                            />
                        </Uikit.Padding>
                    )
                })}
                <Uikit.SizedBox height={50} />
            </Uikit.Padding>
        </Layout>
    )
}