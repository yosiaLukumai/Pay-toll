import "./../../App.scss"
import buy from "../../assets/money.png"
import { useState } from "react"
import { retriveData, save } from "../../utils/localStorage"
import { Button } from "../../components/Button"
import { useEffect } from "react"
import { API } from "../../../variables"
export const Buy = () => {
    const [amount, changeAmount] = useState("")
    const [error, setError] = useState("")
    const [hit, setHit] = useState(false)
    const changesAmount = (e) => {
        e.preventDefault();
        setError("")
        changeAmount(e.target.value)
    }
    const buyUnit = () => {
        setHit(!hit)
    }
    const buyUnits = async () => {
        try {
            setError("")
            console.log("running setting of the amount");
            let url = `${API}/user/addAmount/${retriveData("userPt")._id}/${amount}"`
            const data = await fetch(url)
            const resp = await data.json()
            if (resp.success) {
                if(resp.body._id) {
                    save("userPt", resp.body)
                }
                setError("Transaction  successful")
                changeAmount("")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if(amount.trim() !== "" && parseFloat(amount) > 0) {
            buyUnits()
        }
    }, [hit])
    return (
        <>
            <div className="buy">
                <div className="dashIcon" style={{ padding: "1rem 0" }}>
                    <img src={buy} alt="bu icon"></img>
                </div>
                <div style={{ paddingTop: "1.2rem 0",textAlign: "center",paddingLeft:"0.5rem", fontSize: "1.5rem", fontWeight: "bolder", color: "hsla(216, 28%, 20%, 1)" }}>
                    Top up your Amount
                </div>
                <div className="container">
                    <div className="col s8 cent">
                        <input id="amountInput" placeholder="Enter Amount" value={amount} type="number" onChange={(e) => changesAmount(e)}></input>
                    </div>
                </div>
                <div className="container">
                    <div className="col s8 cents">
                        <Button actionCalled={() => buyUnit()} width="10rem" height="2.8rem" fontWeight="bolder" color="hsla(0, 0%, 21%, 1)" border="none" fontSize="1.3rem" radius="0px" backgroundColor="hsla(43, 59%, 52%, 0.7)" name="Buy"></Button>
                    </div>
                </div>
                <div style={{ marginTop: "5rem 0", textAlign: "center", textDecoration:"underline", fontSize: "1.5rem", fontWeight: "bolder", color: "#eb8258ff" }}>
                    {error}
                </div>
            </div>
        </>
    )
}