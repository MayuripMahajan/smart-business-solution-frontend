import { Link, useNavigate } from "@remix-run/react"
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
                <li className="active">
                    <Link to="../dashboard" >
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link to="../projects">
                        <i className="fas fa-user"></i>
                        <span>Projects</span>
                    </Link>
                </li>

                <li>
                    <Link to="#">
                        <i className="fas fa-chart-bar"></i>
                        <span>Statistics</span>
                    </Link>
                </li>

                <li>
                    <Link to="#">
                        <i className="fas fa-briefcase"></i>
                        <span>Careers</span>
                    </Link>
                </li>

                <li>
                    <Link to="#">
                        <i className="fas fa-question-circle"></i>
                        <span>FAQ</span>
                    </Link>
                </li>


                <li className="logout" onClick={() => logout()}>
                {/* <li className="logout" > */}
                    <Link to="#">
                        <i className="fas fa-sign-out"></i>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar