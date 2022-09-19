export function StyledButton({
    onClick = () => { },
    children,
    className=""
}) {
    var default_className="border border-stone-400 rounded px-1"
    return (
        <button onClick={onClick} className={[default_className,className].join(" ")}>{ children}</button>
    )
}