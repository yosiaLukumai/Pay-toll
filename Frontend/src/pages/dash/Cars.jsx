import "./../../App.scss"
import buy from "../../assets/car.png"
import reg from "../../assets/reg.png"
import { useState } from "react"
import { retriveData, save } from "../../utils/localStorage"
import { Button } from "../../components/Button"
import { useEffect } from "react"
import { Loops } from "./loop"
import { API } from "../../../variables"
export const Cars = () => {
    const [error, setError] = useState("")
    const [hit, setHit] = useState(false)
    const [update, setUpdate] = useState(false)
    const [create, setCreate] = useState(false)
    const [model, setModel] = useState("")
    const [plateNo, setPlateNo] = useState("")
    const [user, setUser] = useState(retriveData("userPt"))

    const callMe = (n) => {
        if (n === 1) {
            setCreate(true)
            setUpdate(false)
        } else {
            setUpdate(true)
            setCreate(false)
        }
    }

    const changePlate = (e) => {
        setPlateNo(e.target.value)
    }

    const chageModel = (e) => {
        setModel(e.target.value)
    }

    const createVehicle = async () => {
        try {
            setError("")
            console.log("running setting of the amount");
            let url = `${API}/user/carregister/${retriveData("userPt")._id}/${plateNo}/${model}"`
            const data = await fetch(url)
            const resp = await data.json()
            if (resp.success) {
                if (resp.body._id) {
                    save("userPt", resp.body)
                    setUser(resp.body)
                }
                setError("Car added")
                changePlate("")
                setModel("")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if (model.trim() !== "" && plateNo.trim() !== "") {
            createVehicle()
        }
    }, [hit])

    const createCar = () => {
        setHit(!hit)
    }
    return (
        <>
            <div>
                <div className="container row leftSized">
                    <div className="col s6">
                        <Button name="Create" actionCalled={() => callMe(1)} fontSize="1.3rem" width="7rem" height="2.4rem" color="hsla(216, 28%, 20%, 1)" fontWeight="bolder" backgroundColor="hsla(43, 59%, 52%, 0.7)" radius="9px" border="none" />
                    </div>
                    <div className="col s6">
                        <Button name="Update" actionCalled={() => callMe(2)} fontSize="1.3rem" width="7rem" height="2.4rem" color="hsla(216, 28%, 20%, 1)" fontWeight="bolder" backgroundColor="hsla(43, 59%, 52%, 0.7)" radius="9px" border="none" />
                    </div>
                </div>
            </div>
            {
                (!user?.plateNumber && (!update && !create)) ? <div className="buy">
                    <div className="dashIcon" style={{ padding: "1rem 0" }}>
                        <img src={buy} alt="debt icon"></img>
                    </div>
                    <div>
                        <h2 className="centered">No car registed</h2>
                    </div>
                </div> : ""
            }
            {
                (user?.plateNumber) ?
                   <Loops user={user}/>
                    : ""
            }

            {
                (create) ?
                    <div className="buys">
                        <div className="dashIcons" style={{ padding: "1rem 0" }}>
                            <img src={reg} alt="debt icon"></img>
                        </div>
                        <div>
                            <div className="container row">
                                <div className="">
                                    <label id="models" htmlFor="model">
                                        Model:
                                        <input type="text" onChange={(e) => chageModel(e)} value={model} id="model" />
                                    </label>
                                </div>
                                <div className="padTop">
                                    <label id="models" htmlFor="model">
                                        L-Plat:
                                        <input type="text" value={plateNo} onChange={(e) => changePlate(e)} id="model" />
                                    </label>
                                </div>
                            </div>
                            <div className="centerBox">
                                <Button name="Create" actionCalled={() => createCar()} fontSize="1.3rem" width="7rem" height="2.4rem" color="hsla(216, 28%, 20%, 1)" fontWeight="bolder" backgroundColor="hsla(43, 59%, 52%, 0.7)" radius="9px" border="none" />
                            </div>
                        </div>
                    </div>
                    : ""
            }
            {

            }
        </>
    )
}