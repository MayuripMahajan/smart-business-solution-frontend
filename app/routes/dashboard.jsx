import styles from "../styles/style1.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import { postAPI } from "~/utils/api"
import { domain } from "~/utils/domain"
import { getCookie } from "~/utils/cookies"
import { useEffect, useState } from "react"
import Loader from "../components/loader"
import loaderCss from "../styles/loader.css"
const Dashboard = () => {

    const [OEmail, setOEmail] = useState();
    const [isLoader, setIsLoader] = useState(true)
    const [analyticsInfo, setAnalyticsInfo] = useState({
        totalProject: 0,
        onGoingProject: 0,
        completedProject: 0
    })

    useEffect(() => {
        userData()
    }, [])

    const allprojects = async (e = null) => {
        try {
            const response = await postAPI(`${domain}/api/project/viewprojects`, JSON.stringify({ email: OEmail || e }))

            let inProgressCount = 0;
            let completedCount = 0;
            response?.projects.map((project) => {
                project?.status == "In Progress" ? inProgressCount = inProgressCount + 1 : null
                project?.status == "Completed" ? completedCount = completedCount + 1 : null
            })

            setAnalyticsInfo((prev) => {
                return {
                    totalProject: response?.projects.length,
                    onGoingProject: inProgressCount,
                    completedProject: completedCount
                }
            })
            setIsLoader(false)
        } catch (err) {
            console.log("Something went wrong")
            setIsLoader(false)

        }
    }

    const userData = async () => {
        await getCookie("UD").then((res) => {
            console.log(JSON.parse(res))
            setOEmail(JSON.parse(res).email)
            allprojects(JSON.parse(res).email)
        })
    }

    return (
        <>
            <Loader isShow={isLoader} />
            <Sidebar />
            <div className="main-content">
                <Header />


                <div className="card-header">
                    <div className="card">
                        <p className="card-no"></p>
                        <p className="card-title" style={{ fontSize: "3rem", padding: "17% 11px" }}>Projects</p>
                    </div>            <div className="card">
                        <p className="card-no">{analyticsInfo?.totalProject}</p>
                        <p className="card-title">Total Projects</p>
                    </div>

                    <div className="card">
                        <p className="card-no">{analyticsInfo?.onGoingProject}</p>

                        <p className="card-title">On Going Projects</p>
                    </div>

                    <div className="card">
                        <p className="card-no">{analyticsInfo?.completedProject}</p>
                        <p className="card-title">Complete Projects</p>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Dashboard

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    },
    {
        rel: "stylesheet",
        href: loaderCss
    }
]