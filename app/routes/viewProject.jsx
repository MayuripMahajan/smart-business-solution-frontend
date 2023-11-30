import { useEffect, useState } from "react"
import styles1 from "../styles/viewProject.css"
import styles from "../styles/style1.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import { postAPI } from "~/utils/api"
import { domain } from "~/utils/domain"

const viewProject = () => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        allprojects()
    }, [])

    const allprojects = async () => {

        const response = await postAPI(`${domain}/api/project/allprojects`, "")
        console.log(response)
        setProjects(response?.projects)
    }





    return (
        <>
            <Sidebar />
            <div className="main-content">



                <Header />

                <div className="table-header">
                    <h3 className="title">Table Data </h3>
                    <div className="table-content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Reporter</th>
                                    <th>Creater</th>
                                    <th>Status</th>
                                    <th>Tags</th>
                                    {/* <th>Association</th>
                                    <th>Assignee</th>
                                    <th>Due Date</th> */}

                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects?.length > 0 ?
                                        projects.map((pro) => {
                                            return <tr>
                                                <td>{pro?.name}</td>
                                                <td>{pro?.owner}</td>
                                                <td>{pro?.project_access}</td>
                                                <td>{pro?.created_at}</td>
                                                <td>{pro?.updated_at}</td>
                                                {/* <td>Ankit</td>
                                                <td>Ankit</td>
                                                <td>28/11/2023</td> */}
                                                <td><button>Edit</button></td>
                                                <td><button onClick={() => {
                                                    confirm("Are You Sure?") ? postAPI(`${domain}/api/project/deleteprojects`, JSON.stringify({ _id: pro?._id })) : null
                                                }}>Delete</button></td>

                                            </tr>
                                        })
                                        :
                                        <tr>No Projects Found</tr>
                                }
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>

        </>
    )
}

export default viewProject

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    }, {
        rel: "stylesheet",
        href: styles1
    }
]