import { useEffect, useState } from "react"
import styles from "../styles/register.css"
import { Link, useNavigate } from "@remix-run/react"
import { postAPI } from "~/utils/api"
import { domain } from "~/utils/domain"
import { getCookie } from "~/utils/cookies"

const Register = () => {

    const navigate = useNavigate()

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    })

    const isAlreadyLoggedIn = () => {
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

    useEffect(() => {
        isAlreadyLoggedIn()

        console.log(userForm)
    }, [])

    const signUp = async () => {
        try {
            if (userForm?.password.length > 0 && userForm?.confirmPassword.length > 0) {
                if (userForm?.password == userForm?.confirmPassword) {
                    const response = await postAPI(`${domain}/api/user/signup`, JSON.stringify(userForm))
                    if (response?.success) {
                        alert("Register Successfully")
                        navigate(`../login`)

                        setUserForm(
                            {
                                name: "",
                                email: "",
                                password: "",
                                confirmPassword: "",
                                phone: ""
                            }
                        )
                    } else {
                        response?.message == "user already exists" &&
                            alert("user already exists")
                    }
                } else {
                    alert("Passwords do not match with confirm Password");
                }
            } else {
                alert("All fields are required...");

            }
        }
        catch (err) {
            console.log("Something Went Wrong", err);
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
                    <h1>Register</h1>
                    <input value={userForm?.name} className="inp" type="text" placeholder="Enter the Name"
                        onChange={(e) => {
                            setUserForm((prev) => {
                                return {
                                    ...prev, name: e.target.value
                                }
                            })
                        }} />
                    <input value={userForm?.email} className="inp" type="email" placeholder="Email"
                        onChange={(e) => {
                            setUserForm((prev) => {
                                return {
                                    ...prev, email: e.target.value
                                }
                            })
                        }} />
                    <input value={userForm?.password} className="inp" type="password" placeholder="Password"
                        onChange={(e) => {
                            setUserForm((prev) => {
                                return {
                                    ...prev, password: e.target.value
                                }
                            })
                        }} />
                    <input value={userForm?.confirmPassword} className="inp" type="password" placeholder="Confirm Password"
                        onChange={(e) => {
                            setUserForm((prev) => {
                                return {
                                    ...prev, confirmPassword: e.target.value
                                }
                            })
                        }} />
                    <input value={userForm?.phone} className="inp" type="text" placeholder="Enter the Mobile Number"
                        onChange={(e) => {
                            setUserForm((prev) => {
                                return {
                                    ...prev, phone: e.target.value
                                }
                            })
                        }} />
                    <button className="btn" onClick={() => signUp()}>Register</button>
                    <p>Forget <a href="#">Password?</a></p>

                    <p>Already Register? <Link to="../login">Login</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Register

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    }
]