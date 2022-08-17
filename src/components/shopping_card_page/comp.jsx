import { useParams } from "react-router-dom"

export default function ShoppingCardPage() {
    var username = useParams().username
    return (
        <h1>here is shopping card page of user @{ username}</h1>
    )
}