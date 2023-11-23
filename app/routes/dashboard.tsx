import styles from "../styles/style1.css"

const Dashboard = () =>{
    return(
        <>
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
    

    <div className="main-content">
        <div className="header-wrapper">
            <div className="header-title">
                <span>Welcome</span>
                <h2>Dashboard</h2>
            </div>

            <div className="user-info">
                <div className="search-box">
                <i className="fa-solid fa-search"></i>
                <input type="text" placeholder="Search"/>
            </div>
            <img src="https://source.unsplash.com/1600x1000/?person" alt=""/>
            </div>
        </div>
    </div>
    </>

    )
}
export default Dashboard

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    }
]