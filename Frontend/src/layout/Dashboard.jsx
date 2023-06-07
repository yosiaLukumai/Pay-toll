import { NavLink, Outlet } from "react-router-dom"
import "./../App.scss"
import settingIcon from "../assets/rod.png"
import { useMediaQuery } from "./../Hooks/mediaQuery"
import { retriveData } from "../utils/localStorage"
export const DashBoard = () => {
    let screenSize = useMediaQuery()
    return (
        <>
            {screenSize.width > 630 ? <div className="bgDash"><h1>Ops...</h1><h1>App is designed for Mobile phone</h1></div> : <div className="dashStyles"><div className="header "><div className="AppName"><span style={{ fontSize: "2rem", fontWeight: "bold", fontStyle:"italic",}}>
                <NavLink to={`/auth/1`} style={{textDecoration:"none", color: "hsla(0, 0%, 90%, 1)"}}>P-toll</NavLink> </span></div><div><img className="responsiveIcon" src={settingIcon} alt="simpleicon"></img></div></div><Outlet /></div>}
        </>
    )
}
