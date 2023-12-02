import styles from "../styles/style.css"
import { Link } from "@remix-run/react"
const Login = () => {
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
                 <input className="inp" type="email" placeholder="Email" />
                 <input className="inp" type="password" placeholder="Password" />
                 <button className="btn">Login</button>
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