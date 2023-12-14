const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <span>Welcome</span>
        <h2>Dashboard</h2>
      </div>

      <div className="user-info">
        {/* <div className="search-box">
                    <i className="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search" />
                </div> */}
        <img
          src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
          loading="lazy"
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
