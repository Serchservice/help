import CategoriesList from "../../app/widgets/CategoriesList";
import * as Uikit from "@serchservice/web-ui-kit";
import React from "react";
import { useParams, Outlet } from "react-router-dom";

export default function CategoryParent() {
    const { isMobile } = Uikit.useDesign();
    const { category } = useParams()
    const [isCategoriesOpen, setIsCategoriesOpen] = React.useState<boolean>(false)

    return (
        <React.Fragment>
            <Uikit.Container backgroundColor={Uikit.Theme.appbarLight} style={{
                    position: "sticky",
                    top: "0",
                    zIndex: "90"
                }} padding={isMobile ? "24px" : "32px"} width="100%">
                <Uikit.Row crossAxis="center">
                    <Uikit.Text
                        text="Help"
                        color={Uikit.Theme.primary}
                        size={16}
                    />
                    <Uikit.SizedBox width={10} />
                    <Uikit.Container backgroundColor={Uikit.Theme.appbarDark} height={20} width={2} borderRadius="40px" />
                    <Uikit.SizedBox width={10} />
                    <Uikit.Text
                        text={Uikit.Utility.capitalizeFirstLetter(category ?? "")}
                        color={Uikit.Theme.primary}
                        size={16}
                    />
                    <Uikit.Spacer />
                    <Uikit.CircularIconButton
                        icon="la:ellipsis-v"
                        backgroundColor={Uikit.Theme.appbarDark}
                        size={0.7}
                        color={Uikit.Theme.secondary}
                        onClick={() => setIsCategoriesOpen(true)}
                    />
                </Uikit.Row>
            </Uikit.Container>
            <Outlet />
            <CategoriesList isOpen={isCategoriesOpen} handleClose={() => setIsCategoriesOpen(false)} />
        </React.Fragment>
    )
}