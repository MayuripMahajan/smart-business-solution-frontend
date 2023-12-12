import { useEffect, useState } from "react"
import styles1 from "../styles/viewProject.css"
import styles from "../styles/style1.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import { postAPI } from "~/utils/api"
import { domain } from "~/utils/domain"
import AddProject from "../components/addproject"
import addProjectStyles from "../styles/addProject.css"
import { getCookie } from "../utils/cookies"
import EditProject from "../components/editProject"
import { Link, useNavigate } from "@remix-run/react"
import Loader from "../components/loader"
import loaderCss from "../styles/loader.css"


const Website = () => {
    return (
        <>
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="table-header">
                    <Link to={'../landingpage'}>Create Website</Link>

                    <div className="table-content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Website</th>
                                    <th>Live Status</th>
                                    <th>Owner</th>
                                    <th>Start date</th>
                                    <th>End Date</th>

                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                {
                                    projects?.length > 0 ?
                                        projects.map((pro, i) => {
                                            return <tr key={pro?._id}>
                                                <td>{i + 1}</td>
                                                <td onClick={() => {
                                                    setIsLoader(true)
                                                    navigate(`../tasks/${pro?._id}`, {
                                                        state: { pid: pro?._id },
                                                    })
                                                }}>


                                                    {pro?.name}</td>
                                                <td>{pro?.status}</td>
                                                <td>{pro?.owner}</td>
                                                <td>{pro?.project_access}</td>
                                                <td>{pro?.created_at}</td>
                                                <td>{pro?.updated_at}</td>
                                                
                                                <td><button onClick={() => { setShowEditForm(true); setCurrentProject(pro) }}>Edit</button></td>
                                                <td><button onClick={() => deleteProject(pro?._id)}>Delete</button></td>

                                            </tr>
                                        })
                                        :
                                        <tr>No Projects Found</tr>
                                }
                            </tbody> */}
                        </table>


                    </div>
                </div>
            </div>

        </>
    )

}
export default Website

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    }, {
        rel: "stylesheet",
        href: styles1
    },
    {
        rel: "stylesheet",
        href: addProjectStyles
    },

    {
        rel: "stylesheet",
        href: loaderCss
    }
]