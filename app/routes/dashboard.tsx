import styles from "../styles/style1.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
const Dashboard = () => {
    return (
        <>
        <Sidebar />

        <Header />
         
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