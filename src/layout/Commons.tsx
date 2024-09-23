import * as Uikit from "@serchservice/web-ui-kit";
import { observer } from "mobx-react-lite";
import React from "react";
import Connect from "../backend/Connect";
import { LinkConfig } from "../configuration/ButtonView";
import { ModalProps } from "./Interfaces";

export const JoinTheConversation: React.FC = observer(() => {
    return (
        <Uikit.Responsive
            phone={
                <Uikit.Container backgroundColor={Uikit.Theme.appbarDark} padding="24px" borderRadius="16px" width="100%">
                    <Uikit.Column crossAxis="center">
                        <Uikit.Text
                            text="Join in the conversation: Share your thoughts on how we can improve security for you and the people you love"
                            color={Uikit.Theme.secondary}
                        />
                        <Uikit.SizedBox height={30} />
                        <Uikit.ActionButton
                            padding="16px"
                            isFullWidth
                            title="Join the SG Community"
                            backgroundColor={Uikit.Theme.primary}
                            color={Uikit.Theme.secondary}
                            onClick={() => Uikit.Navigate.openInNewTab(LinkConfig.instance.sgc)}
                        />
                    </Uikit.Column>
                </Uikit.Container>
            }
        >
            <Uikit.Container backgroundColor={Uikit.Theme.appbarDark} padding="32px" borderRadius="16px" width="100%">
                <Uikit.Row crossAxis="center">
                    <Uikit.Expanded>
                        <Uikit.Text
                            text="Join in the conversation: Share your thoughts on how we can improve security for you and the people you love"
                            color={Uikit.Theme.secondary}
                            size={20}
                        />
                    </Uikit.Expanded>
                    <Uikit.Spacer />
                    <Uikit.ActionButton
                        padding="16px"
                        title="Join the SG Community"
                        backgroundColor={Uikit.Theme.primary}
                        color={Uikit.Theme.secondary}
                        fontSize={16}
                        borderRadius="30px"
                        onClick={() => Uikit.Navigate.openInNewTab(LinkConfig.instance.sgc)}
                    />
                </Uikit.Row>
            </Uikit.Container>
        </Uikit.Responsive>
    )
})

export const ConnectWithUs: React.FC = observer(() => {
    return (
        <Uikit.Center>
            <Uikit.Column crossAxis="center">
                <Uikit.Text text="Connect with us" color={Uikit.Theme.primaryLight} />
                <Uikit.SizedBox height={10} />
                <Uikit.Wrap spacing={5} runSpacing={5}>
                    {LinkConfig.instance.social.map((social, index) => {
                        return (
                            <Uikit.CircularIconButton
                                key={index}
                                icon={social.icon ?? ""}
                                isAwesome
                                title={social.header ?? ""}
                                size={0.5}
                                backgroundColor={Uikit.Theme.appbarDark}
                                color={Uikit.Theme.primaryLight}
                                onClick={() => Uikit.Navigate.openInNewTab(social.path ?? "")}
                            />
                        )
                    })}
                </Uikit.Wrap>
            </Uikit.Column>
        </Uikit.Center>
    )
})

export const ComplaintForm: React.FC<ModalProps> = observer(({isOpen, handleClose}) => {
    const [ isLoading, setIsLoading ] = React.useState(false)
    const [ emailAddress, setEmailAddress ] = React.useState("")
    const [ fullName, setFullName ] = React.useState("")
    const [ comment, setComment ] = React.useState("")

    const width = Uikit.useWidth();
    const { isMobile } = Uikit.useDesign();

    const onSubmitComplaint = async (event: React.FormEvent<HTMLFormElement> | undefined) => {
        if(event !== undefined) {
            event.preventDefault()
        }

        if(isLoading) {
            return;
        } else if(comment === "") {
            Uikit.Notify.warning("State your complaint")
        } else if(fullName.split(" ").length !== 2) {
            Uikit.Notify.warning("Separate your full name with a space like: John Doe")
        } else {
            setIsLoading(true)
            const response = await Connect.post("/company/complaint/complain", {
                "email_address": emailAddress,
                "first_name": fullName.split(" ")[0],
                "last_name": fullName.split(" ")[1],
                "comment": comment
            })
            setIsLoading(false)

            if(response) {
                if(response.isSuccess) {
                    Uikit.Notify.success(response.message)
                    setEmailAddress("")
                    setFullName("")
                    setComment("")
                    handleClose()
                } else {
                    Uikit.Notify.error(response.message)
                }
            }
        }
    }

    return (
        <Uikit.ActionDialog isOpen={isOpen} handleClose={handleClose} header="Having Issue? Let us know here" bgColor={Uikit.Theme.secondary} radius={0} height={500} width={isMobile ? width : 450}>
            <Uikit.Column>
                <Uikit.Container border={`2px dashed${Uikit.Theme.primary}`} padding="12px" borderRadius="12px">
                    <form autoComplete="on" method="submit" onSubmit={onSubmitComplaint}>
                        <Uikit.Field
                            needLabel
                            label="Full Name"
                            placeHolder="Enter your full name"
                            value={fullName}
                            onChange={v => setFullName(v)}
                        />
                        <Uikit.SizedBox height={20} />
                        <Uikit.Field
                            needLabel
                            label="Email Address where support can contact you"
                            placeHolder="Enter your email address"
                            value={emailAddress}
                            onChange={v => setEmailAddress(v)}
                        />
                        <Uikit.SizedBox height={20} />
                        <Uikit.TextAreaField
                            needLabel
                            label="Anything you would like us to know"
                            value={comment}
                            placeHolder="Let your voice be heard and your problem solved"
                            onChange={v => setComment(v)}
                        />
                        <Uikit.Text
                            text={[
                                "By submitting this form, you agree and accept Serchservice privacy policy",
                                "and other policies that govern how we use and process data."
                            ].join(" ")}
                            color={Uikit.Theme.primary}
                            size={isMobile ? 12 : 13}
                        />
                        <Uikit.SizedBox height={50} />
                        <Uikit.ActionButton
                            padding="16px"
                            isFullWidth
                            state={isLoading}
                            title="Submit your complaint"
                            actionText="Submitting.."
                            backgroundColor={Uikit.Theme.primary}
                            color={Uikit.Theme.secondary}
                            onClick={() => onSubmitComplaint(undefined)}
                        />
                    </form>
                </Uikit.Container>
            </Uikit.Column>
        </Uikit.ActionDialog>
    )
})