import styles from "../styles/style.css"
const Login = () => {
    return (
        <div className="main">
            <div className="login">
                <h1>Login</h1>
                <input className="inp" type="email" placeholder="Email" />
                <input className="inp" type="password" placeholder="Password" />
                <button className="btn">Login</button>
                <p>Forget <a href="#">Password?</a></p>
                <p>Dont have account? <a href="#">Register</a></p>
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