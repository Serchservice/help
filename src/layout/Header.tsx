import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { HomeRoute } from "../app/page";
import Asset from "../assets/Asset";
import { LinkConfig } from "../configuration/ButtonView";
import { ComplaintForm, ConnectWithUs, JoinTheConversation } from "./Commons";
import { ModalProps } from "./Interfaces";

const Header: React.FC = observer(() => {
    const [isCommonDrawerOpen, setIsCommonDrawerOpen] = React.useState<boolean>(false);
    const [isComplaintOpen, setIsComplaintOpen] = React.useState<boolean>(false);
    const { isMobile } = Uikit.useDesign();

    const padding = isMobile ? "24px" : "32px 48px"

    return (
        <>
            <Uikit.Container backgroundColor={Uikit.Theme.primary} padding={padding} width="100%">
                <Uikit.Row crossAxis="center">
                    <Link to={HomeRoute.path}>
                        <Uikit.Image image={Asset.logo.white} width={isMobile ? 70 : 100} objectFit="contain" />
                    </Link>
                    <Uikit.Spacer />
                    <Uikit.Wrap runSpacing={10}>
                        <Uikit.ActionButton
                            padding="8px 12px"
                            title="Make a complaint"
                            backgroundColor={Uikit.Theme.primaryDark}
                            color={Uikit.Theme.secondary}
                            onClick={() => setIsComplaintOpen(true)}
                        />
                        <Uikit.SizedBox width={10} />
                        <Uikit.Responsive
                            phone={
                                <Uikit.CircularIconButton
                                    icon="solar:hamburger-menu-broken"
                                    title="Menu"
                                    size={1}
                                    backgroundColor={Uikit.Theme.primaryDark}
                                    color={Uikit.Theme.secondary}
                                    onClick={() => setIsCommonDrawerOpen(true)}
                                />
                            }
                        >
                            <Uikit.ActionButton
                                padding="8px 12px"
                                title="Speak with Support"
                                backgroundColor={Uikit.Theme.primaryDark}
                                color={Uikit.Theme.secondary}
                                onClick={() => Uikit.Navigate.openInNewTab(LinkConfig.instance.support)}
                            />
                            <Uikit.SizedBox width={10} />
                            <Uikit.ActionButton
                                padding="8px 12px"
                                icon="solar:arrow-right-up-outline"
                                iconSize={0.9}
                                title="Visit Serchservice"
                                backgroundColor={Uikit.Theme.primaryDark}
                                color={Uikit.Theme.secondary}
                                onClick={() => Uikit.Navigate.openInNewTab(LinkConfig.instance.serch)}
                            />
                        </Uikit.Responsive>
                    </Uikit.Wrap>
                </Uikit.Row>
            </Uikit.Container>
            <CommonDrawer isOpen={isCommonDrawerOpen} handleClose={() => setIsCommonDrawerOpen(false)} />
            <ComplaintForm isOpen={isComplaintOpen} handleClose={() => setIsComplaintOpen(false)} />
        </>
    )
})

const CommonDrawer: React.FC<ModalProps> = observer(({isOpen, handleClose}) => {
    const quickLinks: Uikit.ParentButtonView = LinkConfig.instance.footer[0];

    return (
        <Uikit.DrawerDialog isOpen={isOpen} handleClose={handleClose} position="right" width="100%" bgColor={Uikit.Theme.primaryDark}>
            <Uikit.Padding all={24}>
                <Uikit.Column crossAxis="flex-start" mainAxisSize="max">
                    <Uikit.Row crossAxis="center">
                        <Link to={HomeRoute.path}>
                            <Uikit.Image image={Asset.logo.white} width={70} objectFit="contain" />
                        </Link>
                        <Uikit.Spacer />
                        <Uikit.CircularIconButton
                            icon="lets-icons:close-round"
                            title="Close"
                            size={1}
                            backgroundColor='transparent'
                            color={Uikit.Theme.secondary}
                            onClick={handleClose}
                        />
                    </Uikit.Row>
                    <Uikit.SizedBox height={30} />
                    {quickLinks.views.map((view, index) => {
                        var isLast: boolean = quickLinks.views[quickLinks.views.length - 1] === view

                        return (
                            <Uikit.Padding key={index} only={{ bottom: isLast ? 0 : 8.0 }}>
                                <Uikit.HoveredButton
                                    text={view.header!}
                                    textColor={Uikit.Theme.primaryLight}
                                    textSize={14}
                                    link={view.path}
                                    isBlank
                                    opacity={0.7}
                                />
                            </Uikit.Padding>
                        )
                    })}
                    <Uikit.SizedBox height={60} />
                    <JoinTheConversation />
                    <Uikit.SizedBox height={60} />
                    <ConnectWithUs />
                </Uikit.Column>
            </Uikit.Padding>
        </Uikit.DrawerDialog>
    )
})

export default Header;