export function Button({ name,actionCalled, width,disabled,  height, fontSize, fontWeight,radius, color, border, backgroundColor }) {
    return (<>
        <button onClick={(e) => actionCalled(name)} disabled={disabled} style={{ width: width, height: height, fontSize: fontSize, borderRadius: radius, fontWeight: fontWeight, color: color, border: border, outline: "none", backgroundColor: backgroundColor}}>{name}</button>
    </>)
}

Button.defaultProps = {
    name: 'white',
    backgroundColor: "inherit",
    fontSize: "1.1rem",
    fontWeight: "lighter",
    border: "1px blue solid",
    radius: "0px",
    width: "8rem",
    height: "2.2rem",
    disabled: false,
    color: "blue"
};