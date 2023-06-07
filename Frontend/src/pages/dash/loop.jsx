import "./../../App.scss"
export const Loops = (user) => {
    return (<>
        {
                <div className="padTop">
                    {
                        <div className="boxedS">
                            <div className=" row infoDesc2">
                                <div className="col s4 name">Plate No.</div>
                                <div className="col s7 namespec">{user.user.plateNumber}</div>
                                <div className="col s4 name">Model.</div>
                                <div className="col s7 namespec">{user.user.model}</div>
                            </div>
                        </div>
                    }
                </div>
            // )
        }

    </>)
}