const Header = () => {
    return (
        <div className="main-content">
        <div className="header-wrapper">
            <div className="header-title">
                <span>Welcome</span>
                <h2>Dashboard</h2>
            </div>

            <div className="user-info">
                <div className="search-box">
                    <i className="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search" />
                </div>
                <img src="https://source.unsplash.com/100x100/?person" loading="lazy" alt="" />
            </div>
        </div>


    </div>
    )
}

export default Header