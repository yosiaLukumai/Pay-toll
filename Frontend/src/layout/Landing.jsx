import "./../App.scss"
import { Button } from "../components/Button"
import locker from "./../assets/barrier.png"
import { useState } from "react"
import { useMediaQuery } from "./../Hooks/mediaQuery"
import { useEffect, useMemo } from "react"
import { retriveData, save } from "../utils/localStorage"
import { Navigate, useNavigate } from "react-router-dom"
import { BaseUrl } from "../variables"
export const Landing = () => {
    const [password, changePassword] = useState("")
    const [email, changeEmail] = useState("")
    const [disable, setDisable] = useState(false)
    const [currentAction, setCurrentAction] = useState("")
    const [error, setError] = useState("")
    let screenSize = useMediaQuery()
    let [clicked, setClicked] = useState(0)
    const [hit, setHit] = useState(false)
    // const [saveUser, setSaveUser] = useState(false)
    const [user, setUser] = useState(null)
    // const [data, setData] = useState(null)

    // useEffect(()=> {
    //     if(data) {
    //         setUser(data)
    //     }
    // }, [saveUser])
    const navigate = useNavigate()
    const fetcher = async (url, payload) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            const jsonResponse = await response.json();
            if (jsonResponse.success) {
                if (currentAction == "Sign in") {
                    if (jsonResponse.success) {
                        save("userPt", jsonResponse.body.user)
                        // setData(jsonResponse.body.user)
                        // setError("")
                        // setDisable(false)
                        // setUser(jsonResponse.body.user)
                        navigate(`/auth/${jsonResponse.body.user?._id}`)
                    }
                } else {
                    setError("Account registered")
                    setDisable(false)
                }
            } else {
                setDisable(false)
                setError(jsonResponse.body)
            }
        } catch (error) {
            setError("Failed to Connect")
            setDisable(false)
            console.log(error);
        }
    }
    useEffect(()=> {
        // console.log("---once---");
            const user=(retriveData("userPt"))
            if(user) {
                setUser(user)
            }
    }, [])
    useEffect(() => {
        // console.log("----hit---");
        if (currentAction == "Sign in") {
            // console.log("try to sign in");
            fetcher(`${BaseUrl}/user/login`, { email, password })
        }
        if (currentAction == "Sign Up") {
            // console.log("try to sign up");
            fetcher(`${BaseUrl}/user/register`, { email, password })
        }
    }, [hit])

    const getValuess = (element, value) => {
        if (element == 1) {
            changeEmail(value)
        }
        if (element == 2) {
            changePassword(value)
        }
    }
    const actionCalled = (name) => {
        setDisable(true)
        setCurrentAction(name)
        setClicked(clicked + 1)
        if (clicked == 1 || (clicked % 2 == 1) || (clicked % 2 == 0)) {
            setHit(!hit)
            setError("")
        }
    }
    return (
        <>
            <div>
                {user && (
                    <Navigate to={`/auth/${user?._id}`} replace={true} />
                )}
            </div>
            <div>
                {
                    (screenSize.width > 630) ? <div>
                        <h1 className="textes">The app is designed for mobile</h1>
                    </div> :
                        <div>
                            <div className="PadTopss"><h2>Pay toll system</h2></div>
                            <div className="bgImgs">
                                {
                                    (error) && <h2 style={{color:"hsla(0, 0%, 21%, 1)",textAlign:"center"}}>{error}</h2>
                                }
                                <img src={locker} className="bgsim"></img>
                                <div className="toppos">
                                    <div>
                                        <label htmlFor="username">
                                            Username
                                            <input type="text" name="" onChange={(e)=> getValuess(1, e.target.value)} id="username" />
                                        </label>
                                    </div>
                                    <div className="tys">
                                        <label htmlFor="password">
                                            Password
                                            <input type="password" name="" onChange={(e)=> getValuess(2, e.target.value)} id="password" />
                                        </label>
                                    </div>
                                    <div className="actionButtons">
                                        <div>
                                            <Button disabled={disable ? true : false} width="9rem" height="2.2rem" fontSize="1.6rem" name="Sign in" actionCalled={(name) => actionCalled(name)}></Button>
                                        </div>
                                        <div>
                                            <Button  disabled={disable ? true : false} width="10rem" height="2.2rem" fontSize="1.6rem" name="Sign Up" actionCalled={(name) => actionCalled(name)}></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}