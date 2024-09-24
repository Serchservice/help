import { HelpCategory } from "@serchservice/contently";
import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import { contently } from "../../App";
import HelpDb from "../../backend/database/HelpDb";
import Routing from "../../configuration/Routing";
import { ModalProps } from "../../layout/Interfaces";

const CategoriesList: React.FC<ModalProps> = observer(({ isOpen, handleClose}) => {
    const { isMobile } = Uikit.useDesign();
    const [categories, setCategories] = React.useState<HelpCategory[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(HelpDb.read.length === 0)

    React.useEffect(() => {
        if(HelpDb.read.length === 0) {
            setCategories(HelpDb.read.sort((a, b) => a.order - b.order));
        }

        setIsLoading(true)

        contently.help.getAllCategories().then((response) => {
            setIsLoading(false)

            if(response) {
                setCategories(response)
                HelpDb.set(response)
            }
        }).catch((_) => {
            setIsLoading(false)
        })
    }, [ ])

    const render = (): JSX.Element => {
        if(isLoading) {
            return (
                <React.Fragment>
                    {Uikit.Utility.itemGenerate(5).map((_, index) => {
                        return (
                            <React.Fragment key={index} >
                                <Uikit.Shimmer height={60} width="100%" />
                                {Uikit.Utility.itemGenerate(5).length - 1 !== index && <Uikit.SizedBox height={10} />}
                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    {categories.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Uikit.HoverLinkButton
                                    value={Uikit.Utility.capitalizeFirstLetter(item.category)}
                                    link={Routing.getRoute(Routing.instance.category, {category: item.category})}
                                    fontSize={isMobile ? "16px" : "24px"}
                                    backgroundColor={Uikit.Theme.primaryDark}
                                    onTap={handleClose}
                                />
                                {categories.length - 1 !== index && <Uikit.SizedBox height={10} />}
                            </React.Fragment>
                        )
                    })}
                </React.Fragment>
            )
        }
    }

    return (
        <Uikit.ActionDialog
            isOpen={isOpen}
            handleClose={handleClose}
            height="100%"
            width="100%"
            header="Help Categories"
            description="Pick the account you are seeking for help with"
            color={Uikit.Theme.secondary}
            fontSize={isMobile ? 24 : 30}
            mainStyles={{padding: isMobile ? "24px" : "48px"}}
            radius={0}
        >
            <Uikit.Column>
                <Uikit.SizedBox height={30} />
                {render()}
            </Uikit.Column>
        </Uikit.ActionDialog>
    )
})

export default CategoriesList;