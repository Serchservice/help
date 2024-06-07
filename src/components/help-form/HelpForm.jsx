import React, { useState } from 'react'
import './help-form.css'
import { Icon } from '@iconify/react'
import { Axios } from '../../api/Axios'
import Loader from '../Loader'
import SweetAlert from '../../config/SweetAlert'

const HelpForm = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ fullName, setFullName ] = useState("")
    const [ comment, setComment ] = useState("")

    const submitForm = async (event) => {
        event.preventDefault()

        if(isLoading) {
            return
        } else if(comment === "") {
            SweetAlert("State your complaint", 'info')
        } else if(fullName.split(" ").length != 2) {
            SweetAlert("Separate your full name with a space like: John Doe", 'info')
        } else {
            setIsLoading(true)
            await Axios.post("/company/complaint/complain", {
                    "email_address": emailAddress,
                    "first_name": fullName.split(" ")[0],
                    "last_name": fullName.split(" ")[1],
                    "comment": comment
                })
                .then((response) => {
                    setIsLoading(false)
                    if(response.data["code"] === 200 || response.data["code"] === 201) {
                        SweetAlert(response.data["message"], "success")
                        setEmailAddress("")
                        setFullName("")
                        setComment("")
                    } else {
                        SweetAlert(response.data["message"], "error")
                    }
                })
                .catch((error) => {
                    setIsLoading(false)
                    if(error?.code === "ERR_NETWORK") {
                        SweetAlert("Network error. Please check your internet connection", "error")
                    } else {
                        SweetAlert(error, "error")
                    }
                })
        }
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="help-form-container" style={{
            height: isOpen ? "auto" : "53px",
        }}>
            <div className='help-form-container-header'>
                <p>Having Issue? Let us know here</p>
                <Icon
                    icon={ isOpen ? "pajamas:close" : "octicon:discussion-closed-24" }
                    height={ 28 }
                    width={ 28 }
                    className='help-form-container-header-icon'
                    onClick={toggle}
                />
            </div>
            <form
                id="helpForm"
                name="Help Form"
                autoComplete="on"
                method="submit"
                className="help-form-form"
                onSubmit={submitForm}
                style={{
                    display: isOpen ? "flex" : "none",
                }}
            >
                <span className="help-form-full-name">
                    <span>First and Last Name</span>
                    <br></br>
                </span>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    required={ true }
                    id="fullName"
                    name="Full Name"
                    autoComplete="name"
                    value={ fullName }
                    className="help-form-textinput"
                    onChange={(e) => setFullName(e.target.value)}
                />
                <span className="help-form-email-address">Email Address where support can contact you</span>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    required={ true }
                    id="emailAddress"
                    name="Email Address"
                    autoComplete="email"
                    value={ emailAddress }
                    className="help-form-textinput1"
                    onChange={(e) => setEmailAddress(e.target.value)}
                />
                <span className="help-form-comment">Anything you would like us to know</span>
                <textarea
                    placeholder="Let your voice be heard and your problem solved"
                    id="more"
                    name="Anything else we would need to know"
                    autoComplete="on"
                    rows="10"
                    required={ true }
                    value={ comment }
                    className="help-form-textarea"
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button type="submit" className="help-form-button">
                    {isLoading ? <Loader width={60}/> : <span className="help-form-button-text">Submit</span>}
                </button>
            </form>
        </div>
    )
}

export default HelpForm
