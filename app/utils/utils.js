import { useNavigate } from "@remix-run/react"
import { getCookie } from "./cookies"

export const isAlreadyLoggedIn = () => {
    const navigate = useNavigate()
    try {
        getCookie("UD").then((res) => {
            if (JSON.parse(res)?.email) {
                navigate("../dashboard")
            }
        })
    } catch (err) {
        console.log("Something went wrong")
    }
}