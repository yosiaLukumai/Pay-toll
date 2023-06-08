import { NavLink, Outlet } from "react-router-dom"
import "./../App.scss"
import settingIcon from "../assets/rod.png"
import { useMediaQuery } from "./../Hooks/mediaQuery"
import { useEffect, useState } from "react"
import { retriveData } from "../utils/localStorage"
export const DashBoard = () => {
    let screenSize = useMediaQuery()
    const [user, setUser] = useState(null)   
    useEffect(()=> {
        setUser(retriveData("userPt"))
    }, [])
    return (
        <>
            {screenSize.width > 630 ? <div className="bgDash"><h1>Ops...</h1><h1>App is designed for Mobile phone</h1></div> : <div className="dashStyles"><div className="header "><div className="AppName"><span style={{ fontSize: "2rem", fontWeight: "bold", fontStyle:"italic",}}>
                <NavLink to={`/auth/${user?._id}`} style={{textDecoration:"none", color: "hsla(0, 0%, 90%, 1)"}}>P-toll</NavLink> </span></div><div><img className="responsiveIcon" src={settingIcon} alt="simpleicon"></img></div></div><Outlet /></div>}
        </>
    )
}
