import { Link } from "@remix-run/react"

const Sidebar = () => {
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


                <li className="logout">
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