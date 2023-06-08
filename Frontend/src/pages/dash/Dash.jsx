import "./../../App.scss"
import dashIcon from "./../../assets/toll.png"
import loan from "./../../assets/money.png"
import { Button } from "./../../components/Button"
import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { retriveData, save } from "../../utils/localStorage"
import { io } from "socket.io-client"
import { SocketUrl } from "../../variables"
export default function Dash() {
    const [logouts, setLogout] = useState(false)
    const [user, setUser] = useState(retriveData("userPt"))
    const logoutFun = () => {
        save("userPt", null)
        setLogout(true)
    }
    useEffect(() => {
        // const datas = async () => {
        //     try {
        //         const url = `http://localhost:3500/user/deduct/${user?._id}/10`
        //         console.log(url);
        //         const data = await fetch(url)
        //         console.log(data.json());
        //     } catch (error) {
        //         console.log(error.message);
        //     }
        // }
        try {
            const socket = io(SocketUrl)
            socket.on("connect", () => console.log(socket.id))
            socket.on("deduct", (data)=> {
                // if(data.){}
                save("userPt", data)
                setUser(data)
            })
        } catch (error) {
            console.log("Error------")
        }
        // datas()

        // socket.on("deduction", (user)=> {
        //     console.log(user);
        // })
    }, [])
    const callMe = () => {
        return
    }
    return (<>

        {
            logouts ? <Navigate to="/" replace /> : ""
        }

        <div style={{ marginTop: "1rem" }}></div>
        <div className="dashIcon">
            <img src={dashIcon} alt="dashboardIcon" />
        </div>
        <div>
            <h3 className="centeredTexts">--Best toll management sys--</h3>
        </div>
        <div className="currentUnit">
            {user?.amount} <span style={{ color: "hsla(279, 40%, 15%, 1)" }}>Tsh</span>
        </div>
        <div className="padTop"></div>
        <div className="container row">
            <div className="col">
                <Link to="Credit">
                    <Button name="Credit" actionCalled={() => callMe()} fontSize="1.7rem" width="9rem" height="3rem" color="hsla(216, 28%, 20%, 1)" fontWeight="bolder" backgroundColor="hsla(43, 59%, 52%, 0.7)" radius="9px" border="none" />
                </Link>
            </div>
            <div className="col">
                <Link to="cars">
                    <Button name="Cars" actionCalled={() => callMe()} fontSize="1.7rem" width="9rem" height="3rem" color="hsla(216, 28%, 20%, 1)" fontWeight="bolder" backgroundColor="hsla(43, 59%, 52%, 0.7)" radius="9px" border="none" />
                </Link>
            </div>

        </div>
        <div className="container row">
            <div className="col">
                <Link to="info">
                    <Button name="Info" actionCalled={() => callMe()} fontSize="1.7rem" width="9rem" height="3rem" color="hsla(216, 28%, 20%, 1)" fontWeight="bolder" backgroundColor="hsla(43, 59%, 52%, 0.7)" radius="9px" border="none" />
                </Link>
            </div>
            <div className="col">
                <Button name="Logout" actionCalled={() => logoutFun()} fontSize="1.7rem" width="9rem" height="3rem" color="hsla(216, 28%, 20%, 1)" fontWeight="bolder" backgroundColor="hsla(43, 59%, 52%, 0.7)" radius="9px" border="none" />
            </div>

        </div>
        {/* 
        
        <div className="container  row">
            <Link to="buy">
            <div className="padAll  col s5">
                <div className="flexrow">
                    <div className="iconed">
                        <img className="iconSized" src={buy}></img>
                    </div>
                    <div className="capT">
                        <div className="centerT">Buy</div>
                    </div>
                </div>
            </div>
            </Link>
           <Link to="debt">
            <div className="padAll offset-s2 col s5">
                <div className="flexrow">
                    <div className="iconed">
                        <img className="iconSized" src={loan}></img>
                    </div>
                    <div className="capT">
                        <div className="centerT">Loan</div>
                    </div>
                </div>
            </div>
            </Link>
        </div>
        <div className="padTop"></div>
        <div className="container  row">
            <Link to="info">
            <div className="padAll  col s5">
                <div className="flexrow">
                    <div className="iconed">
                        <img className="iconSized" src={info}></img>
                    </div>
                    <div className="capT">
                        <div className="centerT">Info</div>
                    </div>
                </div>
            </div>
            </Link>
            <div className="padAll offset-s2 col s5" onClick={(e)=> logoutFun()}>
                <div className="flexrow">
                    <div className="iconed">
                        <img className="iconSized" src={logout}></img>
                    </div>
                    <div className="capT">
                        <div className="centerT">Logout</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="padTop"></div>
        <div className="wrap">
            <span>@e-meters-2023</span>
        </div> */}
    </>)
}