export function StyledDiv({
    onClick = () => {},
    children,
    className=""
}) {
    var default_className="border border-stone-400 rounded px-1"
    return (
        <div onClick={onClick} className={[default_className,className].join(" ")}>{ children}</div>
    )
}
export function StyledInput({
    onClick = () => { },
    children,
    className = "",
    id=undefined,
    placeholder = "",
    type="text"
}) {
    var default_className = "border border-stone-600 rounded px-1"
    return (
        <input
            type={type}
            placeholder={placeholder}
            id={id} onClick={onClick} className={[default_className, className].join(" ")} />
    )
}