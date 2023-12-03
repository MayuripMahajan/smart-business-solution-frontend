import styles from "../styles/style1.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
const Dashboard = () => {
    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Header />
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