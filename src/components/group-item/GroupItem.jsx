import React, { useState } from 'react'
import './group-item.css'
import Spacer from '../Spacer'
import { Icon } from '@iconify/react'
import { useParams } from 'react-router-dom'

const GroupItem = ({
    groupData = {"title": "", "group": "", "faqs": []},
    category = '', section = '', needSpacer = true
}) => {
    const [ openGroup, setOpenGroup ] = useState("")
    const { group, faq } = useParams()

    const toggleGroup = () => {
        if(groupData.group === openGroup) {
            setOpenGroup("")
        } else {
            setOpenGroup(groupData.group)
        }
    }

    return (
        <>
            <div className="group-container" style={{
                height: groupData.group === openGroup ? "auto" : "60px",
                backgroundColor: group === groupData.group ? "#030001" : "#ffffff"
            }}>
                <div className="group-header">
                    <span className="group-header-text" style={{color: group === groupData.group ? "#ffffff" : "#030001"}}>{ groupData.title }</span>
                    <div className="group-header-icon" onClick={toggleGroup}>
                        <Icon icon="solar:alt-arrow-up-line-duotone" width={"100%"} style={{
                            rotate: groupData.group === openGroup ? "0deg" : "180deg",
                            transition: "0.5s",
                            color: group === groupData.group ? "#ffffff" : "#030001"
                        }}/>
                    </div>
                </div>
                <div className='group-item-list' style={{ display: groupData.group === openGroup ? "block" : "none" }}>
                    {
                        groupData.faqs !== null && groupData.faqs.length > 0 && (
                            groupData.faqs.map((data, key) => {
                                return (
                                    <a
                                        className="group-item"
                                        href={`/${ category }/${ section }/${ groupData.group }/${ data.faq }`}
                                        key={ key }
                                        style={{
                                            backgroundColor: faq === data.faq ? "#ffffff" : null,
                                            borderRadius: faq === data.faq ? "20px" : null,
                                            padding: faq === data.faq ? "15px 20px" : null,
                                            margin: faq === data.faq ? "10px 0" : null
                                        }}
                                    >
                                        {
                                            faq !== data.faq && (
                                            <div className="group-step">
                                                <div className="group-step-w" style={{backgroundColor: group === groupData.group ? "#ffffff" : "#030001"}}></div>
                                                <div className="group-step-h" style={{backgroundColor: group === groupData.group ? "#ffffff" : "#030001" }}></div>
                                                { key !== (groupData.faqs.length - 1) && (
                                                    <div className="group-step-h" style={{backgroundColor: group === groupData.group ? "#ffffff" : "#030001"}}></div>
                                                )}
                                                { key === (groupData.faqs.length - 1) && (
                                                    <div className="group-step-h" style={{backgroundColor: group === groupData.group ? "#030001" : "#ffffff"}}></div>
                                                )}
                                            </div>
                                        )}
                                        <span className="group-item-text" style={{color: faq === data.faq ? "#030001" : group === groupData.group ? "#ffffff" : "#030001"}}>{ data.title }</span>
                                    </a>
                                )
                            })
                        )
                    }
                </div>
            </div>
            { needSpacer && (<Spacer height={"15px"} />)}
        </>
    )
}

export default GroupItem
