import { useState } from "react"
import styles from "../styles/style.css"
import { Link } from "@remix-run/react"
import { postAPI } from "~/utils/api"
import { domain } from "~/utils/domain"
import { setCookie } from "../utils/cookies"
const Login = () => {

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const login = async () => {
        try {
            const response = await postAPI(`${domain}/api/user/signin`, JSON.stringify(loginForm))
            if (response?.success) {
                setCookie("UD", JSON.stringify(response?.userDetails))
                alert("Logged Successfully")
                setLoginForm(
                    {
                        email: "",
                        password: "",
                    }
                )
                
            }
            else {
                if (response?.message == "password not match") {
                    alert('Password is incorrect')
                }
                else {
                    alert("Something Went Wrong");

                }
            }
        } catch (err) {
            alert("Something Went Wrong");
        }
    }
    return (


        <div className="main-body">
            <div className="side1">
                <div className="head">
                    <p className="heading1">Impressive</p>
                    <h1 className="heading">React Login Page</h1>
                    <p className="heading1">Template</p>

                </div>

            </div>
            <div className="side2">
                <div className="login">
                    <h1>Login</h1>
                    <input value={loginForm?.email} className="inp" type="email" placeholder="Email"
                        onChange={(e) => {
                            setLoginForm((prev) => {
                                return {
                                    ...prev, email: e.target.value
                                }
                            }
                            )
                        }} />

                    <input value={loginForm?.password} className="inp" type="password" placeholder="Password"
                        onChange={(e) => {
                            setLoginForm((prev) => {
                                return {
                                    ...prev, password: e.target.value
                                }
                            }
                            )
                        }} />
                    <button className="btn" onClick={() => login()}>Login</button>
                    <p>Forget <a href="#">Password?</a></p>
                    <p>Dont have account? <Link to="../register">Register</Link></p>
                </div>
            </div>
        </div>

    )
}
export default Login

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    }
]