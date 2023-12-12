import { NavLink, useNavigate } from "@remix-run/react"
import { deleteCookie } from "~/utils/cookies"

const Sidebar = () => {

    const navigate = useNavigate()

    const logout = () => {
        try {
            deleteCookie("UD")
            navigate(`../login`)
        } catch (err) {
            alert("Something went wrong")
        }
    }
    return (
        <div className="sidebar">
            <div className="logo"></div>
            <ul className="menu">
                <li>
                    <NavLink to="../dashboard" >
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="../projects">
                        <i className="fas fa-user"></i>
                        <span>Projects</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="../landingpage">
                        <i className="fas fa-chart-bar"></i>
                        <span>Create Your Website</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="../website">
                        <i className="fas fa-chart-bar"></i>
                        <span>Website</span>
                    </NavLink>
                </li>



                <li>
                    <NavLink to="../faq">
                        <i className="fas fa-question-circle"></i>
                        <span>FAQ</span>
                    </NavLink>
                </li>


                <li className="logout" onClick={() => logout()}>
                    {/* <li className="logout" > */}
                    <NavLink to="#">
                        <i className="fas fa-sign-out"></i>
                        <span>Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar