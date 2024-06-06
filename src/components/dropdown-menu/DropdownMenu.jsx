import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "./dropdown-menu.css";

function DropdownMenu({text = '', list = [{"title": "", "category": ""}]}) {
    const [ open, setOpen ] = useState(false);
    const [ index, setIndex ] = useState(-1)
    const dropdownRef = useRef(null);

    const handleOpenList = () => {
        setOpen(!open);
    }

    const handleHover = (key) => {
        setIndex(key);
    }

    const hoverStyle = {
        backgroundColor: "#030001",
        color: "#fff",
        borderRadius: "0",
        fontSize: "14px",
        fontWeight: "500"
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown-menu" ref={dropdownRef}>
            <div onClick={handleOpenList} className="dropdown-toggle">
                { text }
                <div className={`dropdown-icon ${open ? 'rotate-180' : ''}`}>
                    <Icon icon="lucide:chevron-down" width="18" height="18" />
                </div>
            </div>
            {
                open && (
                    <div className="dropdown-list">
                        {list.map((item, key) => (
                            <a
                                key={key}
                                href={ `/${ item.category }` }
                                onMouseEnter={() => handleHover(key)}
                                className="dropdown-item"
                                style={index === key ? hoverStyle : { fontSize: "14px", fontWeight: "500" }}
                            >{ item.title }</a>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default DropdownMenu;