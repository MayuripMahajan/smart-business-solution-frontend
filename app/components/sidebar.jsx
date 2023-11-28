const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo"></div>
            <ul className="menu">
                <li className="active">
                    <a href="#" >
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <i className="fas fa-chart-bar"></i>
                        <span>Statistics</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <i className="fas fa-briefcase"></i>
                        <span>Careers</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <i className="fas fa-question-circle"></i>
                        <span>FAQ</span>
                    </a>
                </li>


                <li className="logout">
                    <a href="#">
                        <i className="fas fa-sign-out"></i>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar