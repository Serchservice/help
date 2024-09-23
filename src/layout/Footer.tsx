import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { HomeRoute } from "../app/page";
import Asset from "../assets/Asset";
import { LinkConfig } from "../configuration/ButtonView";
import { CURRENT_VERSION } from "../version";
import { ConnectWithUs, JoinTheConversation } from "./Commons";

interface FooterProps {
    isShort?: boolean;
}

const Footer: React.FC<FooterProps> = observer(({ isShort = true }) => {
    const { isMobile } = Uikit.useDesign();

    const buildVersion = (): JSX.Element => {
        if (isShort) {
            return <ShortVersion />;
        } else {
            return <DetailedVersion />;
        }
    }

    return (
        <Uikit.Container backgroundColor={Uikit.Theme.primary} padding={isMobile ? "48px 24px" : "64px 48px"} width="100%">
            {buildVersion()}
        </Uikit.Container>
    )
});

// ShortVersion component of the Footer Component
const ShortVersion: React.FC = observer(() => {
    return (
        <Uikit.Column crossAxis="flex-start">
            <Head />
            <Uikit.SizedBox height={120} />
            <JoinTheConversation />
            <Uikit.SizedBox height={20} />
            <ConnectWithUs />
            <Uikit.SizedBox height={40} />
            <Bottom />
        </Uikit.Column>
    );
});

// DetailedVersion of the Footer Component
const DetailedVersion: React.FC = observer(() => {
    return (
        <Uikit.Column crossAxis="flex-start">
            <Head />
            <Uikit.SizedBox height={120} />
            <Uikit.Wrap
                spacing={15}
                runSpacing={15}
                children={LinkConfig.instance.footer.map((footer, index) => {
                    return <FooterLink parent={footer} key={index} />
                })}
            />
            <Uikit.SizedBox height={80} />
            <JoinTheConversation />
            <Uikit.SizedBox height={20} />
            <ConnectWithUs />
            <Uikit.SizedBox height={40} />
            <Bottom />
        </Uikit.Column>
    );
});

const Head: React.FC = observer(() => {
    return (
        <Uikit.Column crossAxis="flex-start">
            <Link to={HomeRoute.path}>
                <Uikit.Image image={Asset.logo.white} width={120} objectFit="contain" />
            </Link>
            <Uikit.SizedBox height={10} />
            <Uikit.Image image={Asset.logo.tagWhite} width={180} objectFit="contain" />
        </Uikit.Column>
    )
})

interface FooterLinkProps {
    parent: Uikit.ParentButtonView;
}

const FooterLink: React.FC<FooterLinkProps> = observer(({ parent }) => {
    const width = Uikit.useWidth();

    return (
        <Uikit.Container minWidth={200} maxHeight={width}>
            <Uikit.Expanded>
                <Uikit.Column crossAxis="stretch">
                    <Uikit.Padding all={4.0}>
                        <Uikit.Text text={parent.section} color={Uikit.Theme.secondary} weight='bold' size={18} />
                    </Uikit.Padding>
                    <Uikit.SizedBox height={10} />
                    {parent.views.map((view, index) => {
                        var isLast: boolean = parent.views[parent.views.length - 1] === view

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
                </Uikit.Column>
            </Uikit.Expanded>
        </Uikit.Container>
    )
})

const Bottom: React.FC = observer(() => {
    return (
        <Uikit.Container width="100%">
            <Uikit.Wrap spacing={20} runSpacing={20}>
                <Uikit.Column crossAxis="flex-start" crossAxisSize="min">
                    <Uikit.Text text="© 2023 Serchservice Inc. All Rights Reserved." color={Uikit.Theme.hint} size={12} />
                    <Uikit.SizedBox height={4} />
                    <Uikit.Text text={`v${CURRENT_VERSION}`} color={Uikit.Theme.hint} size={12} />
                </Uikit.Column>
                <Uikit.Spacer />
                <Uikit.Wrap spacing={5} runSpacing={5}>
                    {LinkConfig.instance.legal.map((view, index) => {
                        return (
                            <Uikit.HoveredButton
                                key={index}
                                text={view.header!}
                                textColor={Uikit.Theme.primaryLight}
                                backgroundColor={Uikit.Utility.lightenColor(Uikit.Theme.primaryDark, -8)}
                                textSize={12}
                                link={view.path}
                                isBlank
                                opacity={0.7}
                            />
                        )
                    })}
                </Uikit.Wrap>
            </Uikit.Wrap>
        </Uikit.Container>
    )
})

export default Footer;