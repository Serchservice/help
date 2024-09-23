import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import Routing from "../../configuration/Routing";
import { Theme } from "@serchservice/web-ui-kit";

export interface ILinkedItem {
    link: string;
    text: string;
}

interface LinkedProps {
    links: ILinkedItem[];
}

const Linked: React.FC<LinkedProps> = observer(({ links }) => {
    const linkedLinks = [
        {
            link: Routing.instance.home.path,
            text: "Home"
        },
        ...links
    ]

    return (
        <Uikit.Wrap runSpacing={20} spacing={5}>
            {linkedLinks.map((item, index) => {
                if(item !== undefined) {
                    return (
                        <Uikit.LinkedButton
                            text={item.text}
                            key={index}
                            textColor={Theme.primary}
                            textSize={13}
                            link={item.link}
                            iconSize={1}
                            showNext={linkedLinks.length - 1 !== index}
                        />
                    )
                } else {
                    return <></>
                }
            })}
        </Uikit.Wrap>
    )
})

export default Linked;