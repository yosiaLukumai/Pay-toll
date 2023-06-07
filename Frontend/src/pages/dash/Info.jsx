import "./../../App.scss"
import group from "../../assets/user.png"
import { useState } from "react"
import { retriveData } from "../../utils/localStorage"
export const Info = () => {
    const [user, changeUser] =useState(retriveData("userPt"))
    return (
        <>
            <div className="buy">
                <div className="dashIcon" style={{ padding: "1rem 0" }}>
                    <img src={group} alt="bu icon"></img>
                </div>
                <div style={{ paddingTop: "1.2rem 0", textAlign: "center", fontSize: "1.7rem", fontWeight: "bolder", color: "hsla(0, 0%, 21%, 1)" }}>
                    Your Account Info
                </div>
                <div style={{ paddingTop: "20px" }}></div>
                <div className="container row infoDesc">
                    <div className="col s4 name">Email</div>
                    <div className="col s6 namespec">{user?.email}</div>
                </div>
                <div className="container row infoDesc">
                    <div className="col s4 name">Plate No.</div>
                    <div className="col s7 namespec">{user?.plateNumber}</div>
                </div>
            </div>

        </>
    )
}