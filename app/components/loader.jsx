const Loader = ({ isShow }) => {
    return (
        <div>
            {
                isShow &&
                <div className="loader-box">
                    <div className="loader"></div>
                </div>
            }
        </div>
    )
}

export default Loader