const Loader = ({ isShow }) => {
    return (
        <div>
            {
                isShow &&
                <div class="loader-box">
                    <div class="loader"></div>
                </div>
            }
        </div>
    )
}

export default Loader